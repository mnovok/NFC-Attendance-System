const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Attendance } = require('../models/Attendance');

router.get('/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendances = await Attendance.find({ studentId })
      .populate('classId', 'name type date startTime endTime professorId')
      .populate('otherId', 'name surname email');

    res.json(attendances);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance data', error: err });
  }
});

module.exports = router;