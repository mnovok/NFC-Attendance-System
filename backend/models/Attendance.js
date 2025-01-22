const mongoose = require('mongoose');
const { User } = require('./User');
const { Class } = require('./Class');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  status: {
    type: String,
    enum: ['Prisutan', 'Neprisutan'],
    required: true,
  },
  studentUID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);