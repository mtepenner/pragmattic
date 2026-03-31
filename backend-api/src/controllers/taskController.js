const prisma = require('../utils/db');
const { createCalendarEvent, deleteCalendarEvent } = require('../services/googleCalendar');

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, durationMinutes, dueDate } = req.body;
    const userId = req.user.id;

    // 1. Fetch the user to see if they have a Google Refresh Token
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // 2. Create the task in PostgreSQL/SQLite
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        durationMinutes: parseInt(durationMinutes) || 30,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        userId
      }
    });

    // 3. If the user is connected to Google Calendar, sync it!
    if (user && user.googleRefreshToken) {
      const googleEventId = await createCalendarEvent(user.googleRefreshToken, newTask);
      
      // Update our database with the Google Event ID
      if (googleEventId) {
        await prisma.task.update({
          where: { id: newTask.id },
          data: { googleEventId }
        });
        newTask.googleEventId = googleEventId;
      }
    }

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the task to get its googleEventId
    const task = await prisma.task.findUnique({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    // Delete from Google Calendar first
    if (task.googleEventId && user && user.googleRefreshToken) {
      await deleteCalendarEvent(user.googleRefreshToken, task.googleEventId);
    }

    // Delete from our database
    await prisma.task.delete({ where: { id } });
    
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = { getTasks, createTask, deleteTask };
