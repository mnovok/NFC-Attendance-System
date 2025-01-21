const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const Class = require('../models/Class');

router.post('/nfc', async (req, res) => {
  const { uid } = req.body; // Extract UID from the request body

  if (!uid) {
    return res.status(400).send({ message: 'UID is missing' });
  }

  try {
    // Find the student by UID
    const student = await User.findOne({ uid: uid });

    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // Find the class (assuming you have a way to determine the class)
    const classId = '678fc73771e8cb87c6f0dd48'; // Replace with actual class ID

    // Create a new attendance record
    const attendance = new Attendance({
      studentId: student._id,
      classId: classId,
      status: 'Prisutan',
      otherId: uid,
    });

    await attendance.save();

    res.status(201).send({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error('Error processing NFC UID:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;