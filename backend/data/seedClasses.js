const mongoose = require('mongoose');
const { User } = require('../models/User');
const { Class } = require('../models/Class');

const classes = [
    {
      "name": "Ugradbeni racunalni sustavi",
      "type": "predavanje",
      "roomNumber": "A301",
      "date": "2025-01-21",
      "startTime": "12:00",
      "endTime": "14:00",
      "professorId": "67882684009afd8a79595210"
    },
    {
      "name": "Grid racunalni sustavi",
      "type": "predavanje",
      "roomNumber": "B402",
      "date": "2025-01-20",
      "startTime": "14:00",
      "endTime": "16:00",
      "professorId": "67882684009afd8a7959520f"
    },
    {
      "name": "Grid racunalni sustavir",
      "type": "auditorne",
      "roomNumber": "B501",
      "date": "2025-01-23",
      "startTime": "09:00",
      "endTime": "12:00",
      "professorId": "67882684009afd8a7959520f"
    }
];

const seedClasses = async () => {
  try {
    for (const classData of classes) {
      // Create the class and link the professor's ObjectId
      await Class.create({
        name: classData.name,
        type: classData.type,
        roomNumber: classData.roomNumber,
        date: new Date(classData.date), // Ensure date is in Date format
        startTime: classData.startTime,
        endTime: classData.endTime,
        professorId: classData.professorId, // Directly use ObjectId
      });

      console.log(`Class "${classData.name}" successfully added to the database.`);
    }
  } catch (error) {
    console.error('Error while seeding classes:', error);
  }
};

module.exports = {
  seedClasses,
};
