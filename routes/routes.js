const express = require('express');
const router = express.Router();
const Submission = require('../models/submission');

// API endpoint to receive form data and store it in the database
router.post('/', async (req, res) => {
  try {
    const submissionData = req.body;
    const submission = new Submission(submissionData);
    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// API endpoint to retrieve existing form submissions with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const count = await Submission.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const submissions = await Submission.find()
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    .skip(skip)
    .limit(limit);
    res.json({ submissions, totalPages });

    
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

module.exports = router;
