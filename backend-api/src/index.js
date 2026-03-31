require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Initialize Express and Prisma
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allows your mobile app to make requests to this API
app.use(express.json()); // Parses incoming JSON requests

// Basic Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pragmattic API is running smoothly.' });
});

// --- Placeholder Routes (We will move these to the /routes folder later) ---

// Get all tasks for a user
app.get('/api/tasks', async (req, res) => {
  try {
    // Hardcoded userId for testing until we add real authentication
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, durationMinutes, dueDate, userId } = req.body;
    
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        durationMinutes: parseInt(durationMinutes) || 30,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId // In a real app, this comes from the authenticated user token
      }
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🗄️  Database connected via Prisma`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
