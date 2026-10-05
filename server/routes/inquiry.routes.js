const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const jwt = require('jsonwebtoken');

// Inline Middleware to require Admin status via JWT validation
const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing from authorization header' });
  }

  try {
    const secret = process.env.ADMIN_JWT_SECRET || 'forgeai-admin-secret-change-me';
    const decoded = jwt.verify(token, secret);
    req.adminUser = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired administrator token' });
  }
};

// GET /api/inquiries - PUBLIC (List all inquiries)
router.get('/', async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
});

// GET /api/inquiries/:id - PUBLIC (Get specific inquiry details)
router.get('/:id', async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json(inquiry);
  } catch (error) {
    next(error);
  }
});

// POST /api/inquiries - PUBLIC (Submit a new inquiry / Admin can also create)
router.post('/', async (req, res, next) => {
  try {
    const { fullName, email, phone, inquiryType, message, budgetRange, eventDate, status } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required fields.' });
    }

    const newInquiry = new Inquiry({
      fullName,
      email,
      phone: phone || '',
      inquiryType: inquiryType || 'Editorial',
      message: message || '',
      budgetRange: budgetRange || 'Standard',
      eventDate: eventDate ? new Date(eventDate) : null,
      status: status || 'Pending'
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// PUT /api/inquiries/:id - requireAdmin only (Update status or details)
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const { fullName, email, phone, inquiryType, message, budgetRange, eventDate, status } = req.body;
    
    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (inquiryType !== undefined) updateData.inquiryType = inquiryType;
    if (message !== undefined) updateData.message = message;
    if (budgetRange !== undefined) updateData.budgetRange = budgetRange;
    if (eventDate !== undefined) updateData.eventDate = eventDate ? new Date(eventDate) : null;
    if (status !== undefined) updateData.status = status;

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ error: 'Inquiry not found to update' });
    }

    res.json(updatedInquiry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// DELETE /api/inquiries/:id - requireAdmin only (Delete inquiry)
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) {
      return res.status(404).json({ error: 'Inquiry not found to delete' });
    }
    res.json({ message: 'Inquiry deleted successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;