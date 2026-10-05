const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    dateCompleted: {
      type: Date,
      required: [true, 'Completion date is required']
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true
    },
    aspectRatio: {
      type: String,
      default: '16/9',
      trim: true
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Optimize query performance for general portfolio displays and filtering
projectSchema.index({ featured: 1, createdAt: -1 });
projectSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);