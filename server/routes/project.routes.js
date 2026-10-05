const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'forgeai-admin-secret-change-me';

// Middleware to verify Admin JWT
const requireAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }
      // Assuming token contains admin flag or we trust verification for admin routes
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects - Fetch all projects
router.get('/', async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = {};

    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ dateCompleted: -1, _id: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id - Fetch single project
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// POST /api/projects - Create a project (PUBLIC based on fixed instructions)
router.post('/', async (req, res, next) => {
  try {
    const { title, category, location, dateCompleted, imageUrl, aspectRatio, featured, description } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ error: 'Title, category, and imageUrl are required fields.' });
    }

    const newProject = new Project({
      title,
      category,
      location: location || 'Austin, TX',
      dateCompleted: dateCompleted ? new Date(dateCompleted) : new Date(),
      imageUrl,
      aspectRatio: aspectRatio || '16/9',
      featured: featured === true || featured === 'true',
      description: description || ''
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// PUT /api/projects/:id - Update project (Requires Admin)
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const { title, category, location, dateCompleted, imageUrl, aspectRatio, featured, description } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (title !== undefined) project.title = title;
    if (category !== undefined) project.category = category;
    if (location !== undefined) project.location = location;
    if (dateCompleted !== undefined) project.dateCompleted = new Date(dateCompleted);
    if (imageUrl !== undefined) project.imageUrl = imageUrl;
    if (aspectRatio !== undefined) project.aspectRatio = aspectRatio;
    if (featured !== undefined) project.featured = (featured === true || featured === 'true');
    if (description !== undefined) project.description = description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// DELETE /api/projects/:id - Delete project (Requires Admin)
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project successfully deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;