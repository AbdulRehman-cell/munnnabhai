const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      default: '',
      trim: true
    },
    inquiryType: {
      type: String,
      required: [true, 'Inquiry type is required'],
      trim: true,
      default: 'Editorial'
    },
    message: {
      type: String,
      required: [true, 'Message detail is required'],
      trim: true
    },
    budgetRange: {
      type: String,
      default: 'Undecided',
      trim: true
    },
    eventDate: {
      type: Date,
      required: false
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'In Discussion', 'Booked', 'Archived', 'Pending', 'new', 'reviewed'],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);