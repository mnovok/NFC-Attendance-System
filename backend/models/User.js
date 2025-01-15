const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  surname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'professor'], required: true },
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  className: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['predavanje', 'lab', 'vjezbe'], required: true },
  status: { type: String, enum: ['Prisutan', 'Neprisutan'], required: true },
});

const User = mongoose.model('User', userSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = { User, Attendance };
