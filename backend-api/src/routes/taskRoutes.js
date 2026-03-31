const express = require('express');
const router = express.Router();
const { getTasks, createTask, deleteTask } = require('../controllers/taskController');
const { authenticate } = require('../middlewares/auth');

// Protect all task routes with our authentication middleware
router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;
