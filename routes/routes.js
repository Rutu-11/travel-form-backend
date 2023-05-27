const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");

// API endpoint to receive form data and store it in the database
router.post("/submissions", async (req, res) => {
  try {
    const submissionData = req.body;
    const submission = new Submission(submissionData);
    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ error: "Failed to save submission" });
  }
});

// API endpoint to retrieve existing form submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

module.exports = router;
