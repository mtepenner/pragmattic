require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Routes
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pragmattic API is running smoothly.' });
});

// Mount Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
