const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  className: { type: String, required: true },
  status: { type: String, enum: ['Prisutan', 'Neprisutan'], required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
