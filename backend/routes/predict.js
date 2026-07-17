const express = require('express');
const router = express.Router();
const axios = require('axios');
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  try {
    const studentData = req.body;

    // Call the Flask ML API
    const mlResponse = await axios.post(`${process.env.ML_API_URL}/predict`, studentData);
    const { predicted_score, risk_level } = mlResponse.data;

    // Save to MongoDB
    const newStudent = new Student({
      ...studentData,
      predicted_score,
      risk_level
    });
    await newStudent.save();

    res.json({
      predicted_score,
      risk_level,
      student: newStudent
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Prediction failed', details: err.message });
  }
});

module.exports = router;
