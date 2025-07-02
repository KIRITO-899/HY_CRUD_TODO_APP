const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/todos - Create a new todo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todo = new Todo({
      title,
      description,
      priority,
      dueDate,
      userId: req.user._id
    });

    await todo.save();

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET /api/todos - Get all todos for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { completed, priority, page = 1, limit = 10 } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    if (priority) {
      filter.priority = priority;
    }

    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const todos = await Todo.find(filter, null, options);
    const total = await Todo.countDocuments(filter);

    res.json({
      success: true,
      todos,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: todos.length,
        totalTodos: total
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;
    
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;

    await todo.save();

    res.json({
      success: true,
      message: 'Todo updated successfully',
      todo
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully',
      todo
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
