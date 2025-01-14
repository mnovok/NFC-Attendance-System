const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    nfcTagId: { type: String, required: true },
    lectureId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema);