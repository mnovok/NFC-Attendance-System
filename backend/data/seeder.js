const User = require('../models/User');
const Class  = require('../models/Class');
const Attendance = require('../models/Attendance');
const users = require('./seedUsers');
const attendances = require('./seedAttendance');
const classes = require('./seedClasses');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
  try {
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        console.log(`User with email "${userData.email}" already exists.`);

        // Check if the user is missing a UID and update it if necessary
        if (!existingUser.uid) {
          existingUser.uid = userData.uid; // Assign UID from JSON
          await existingUser.save(); // Save the updated user
          console.log(`UID added to user "${userData.email}".`);
        } else {
          console.log(`User "${userData.email}" already has a UID. Skipped updating.`);
        }

        continue;
      }

      // Create a new user if they don't already exist
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      await User.create({
        email: userData.email,
        name: userData.name,
        surname: userData.surname,
        password: hashedPassword,
        role: userData.role,
        uid: userData.uid,
      });

      console.log(`User "${userData.email}" successfully added to db.`);
    }
  } catch (error) {
    console.error('Error while seeding users:', error);
  }
};

const seedClasses = async () => {
  try {
    for (const classesData of classes) {
      let professorEmail;
      if(classesData.name === 'Ugradbeni racunalni sustavi') {
        professorEmail = "sgotov@fesb.hr";
      } else if ( classesData.name === 'Grid racunalni sustavi') {
        professorEmail = "vplest@fesb.hr";
      }

      const professorID = await User.findOne({ email: professorEmail }, { _id: 1 });

      await Class.create({
        name: classesData.name,
        type: classesData.type,
        roomNumber: classesData.roomNumber,
        date: classesData.date,
        startTime: classesData.startTime,
        endTime: classesData.endTime,
        professorId: professorID,
      });

      console.log(`Class "${classesData.name}" successfully added to db.`);
    }
  } catch (error) {
    console.error('Error while seeding classes:', error);
  }
}

const seedAttendances = async () => {
  try {
    const allClasses = await Class.find();
    let counter = 0;

    for (const attendanceData of attendances) {
      const randomClass = allClasses[counter++];
      const student = await User.findOne({ uid: attendanceData.studentUID });

      await Attendance.create({
        studentId: student._id,
        classId: randomClass._id,
        status: attendanceData.status,
        studentUID: attendanceData.studentUID
      })

      console.log(`Attendance successfully added to db.`);
    }
  } catch (error) {
    console.error('Error while seeding attendance:', error);
  }
}

// const seedAttendances = async () => {
//   try {
//     const classes = await Class.find({});

//     for (const attendanceData of attendances) {
//       // Find the class by its ObjectId
//       const classData = classes.find(cls => cls._id.toString() === attendanceData.classId);

//       if (!classData) {
//         console.error(`Class with ID ${attendanceData.classId} not found.`);
//         continue;
//       }

//       // If the class does not contain otherId (or any other condition you want to check)
//       if (!attendanceData.otherId) {
//         console.log(`Skipping attendance for student ${attendanceData.studentId} because no otherId was provided.`);
//         continue;
//       }

//       // Create a new attendance record
//       const attendance = new Attendance({
//         studentId: attendanceData.studentId,
//         classId: classData._id,
//         status: attendanceData.status,
//         otherId : attendanceData.otherId
//       });

//       // Save the attendance record
//       await attendance.save();
//       console.log(`Attendance for student ${attendanceData.studentId} in class ${classData.name} added.`);
//     }
//   } catch (error) {
//     console.error('Error while seeding attendances:', error);
//   }
// };

module.exports = {
  seedUsers,
  seedAttendances,
  seedClasses,
};