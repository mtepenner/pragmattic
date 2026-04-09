const request = require('supertest');
const express = require('express');

// Mock dependencies before requiring the router
jest.mock('../src/utils/db', () => ({
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
  }
}));

jest.mock('../src/middlewares/auth', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 'mock-user-id' };
    next();
  }
}));

// Mock the Google Calendar service
jest.mock('../src/services/googleCalendar', () => ({
  createCalendarEvent: jest.fn().mockResolvedValue('mock-google-event-id'),
  deleteCalendarEvent: jest.fn().mockResolvedValue(true),
}));

const prisma = require('../src/utils/db');
const taskRoutes = require('../src/routes/taskRoutes');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/tasks - should fetch all tasks for the authenticated user', async () => {
    const mockTasks = [
      { id: '1', title: 'Test Task', status: 'TODO', userId: 'mock-user-id' }
    ];
    prisma.task.findMany.mockResolvedValue(mockTasks);

    const res = await request(app).get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockTasks);
    expect(prisma.task.findMany).toHaveBeenCalledWith({
      where: { userId: 'mock-user-id' },
      orderBy: { createdAt: 'desc' }
    });
  });

  it('POST /api/tasks - should create a new task', async () => {
    const newTaskPayload = { title: 'New Task', durationMinutes: 45 };
    const mockCreatedTask = { id: '2', ...newTaskPayload, userId: 'mock-user-id' };
    
    // Simulate finding a user without a google token for simplicity
    prisma.user.findUnique.mockResolvedValue({ id: 'mock-user-id' }); 
    prisma.task.create.mockResolvedValue(mockCreatedTask);

    const res = await request(app)
      .post('/api/tasks')
      .send(newTaskPayload);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New Task');
    expect(prisma.task.create).toHaveBeenCalled();
  });
});
