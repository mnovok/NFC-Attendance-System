const { User } = require('../models/User');
const { Class } = require('../models/Class');
const { Attendance } = require('../models/Attendance');

const attendances = [
  {
    studentId: "CF4E81E", // Student's UID
    classId: "678fc73771e8cb87c6f0dd46", // Class's ObjectId
    status: "Prisutan",
    otherId: "678fbd37572f40839a8d7077"
  },
  {
    studentId: "CF4E81E",
    classId: "678fc73771e8cb87c6f0dd4b",
    status: "Neprisutan",
    otherId: "678fbd37572f40839a8d7077"
  },
  {
    studentId: "CF4E81E",
    classId: "678fc73771e8cb87c6f0dd46",
    status: "Prisutan",
    otherId: "678fbd37572f40839a8d7077"
  },
];

const seedAttendances = async () => {
  try {
    // Fetch all classes
    const classes = await Class.find({});

    // Iterate over each attendance record
    for (const attendanceData of attendances) {
      // Find the class by its ObjectId
      const classData = classes.find(cls => cls._id.toString() === attendanceData.classId);

      if (!classData) {
        console.error(`Class with ID ${attendanceData.classId} not found.`);
        continue;
      }

      // If the class does not contain otherId (or any other condition you want to check)
      if (!attendanceData.otherId) {
        console.log(`Skipping attendance for student ${attendanceData.studentId} because no otherId was provided.`);
        continue;
      }

      // Create a new attendance record
      const attendance = new Attendance({
        studentId: attendanceData.studentId,
        classId: classData._id,
        status: attendanceData.status,
        otherId : attendanceData.otherId
      });

      // Save the attendance record
      await attendance.save();
      console.log(`Attendance for student ${attendanceData.studentId} in class ${classData.name} added.`);
    }
  } catch (error) {
    console.error('Error while seeding attendances:', error);
  }
};

module.exports = { seedAttendances };
