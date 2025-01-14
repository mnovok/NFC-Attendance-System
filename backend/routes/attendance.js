const express = require('express');
const router = express.Router();

// Example route
router.post('/', (req, res) => {
    const { nfcTagId, lectureId } = req.body;
    // Logic to handle attendance
    res.status(200).json({ message: 'Attendance recorded', nfcTagId, lectureId });
});

module.exports = router;