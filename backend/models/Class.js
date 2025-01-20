const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  type: {
    type: String,
    enum: ['predavanje', 'lab', 'auditorne'],
    required: true,
  },
  roomNumber: {
    type: String,
    required: true, 
  },
  date: {
    type: Date,
    required: true, 
  },
  startTime: {
    type: String,
    required: true, 
  },
  endTime: {
    type: String,
    required: true, 
  },
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
  },
});

module.exports = mongoose.model('Class', classSchema);