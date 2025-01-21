const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const loginRoutes = require('./routes/loginRoutes');
const attendanceRoutes = require('./routes/attendance');
const nfcRoutes = require('./routes/nfc');
const { seedUsers } = require('./data/seeder');
const { seedClasses } = require('./data/seedClasses');
const { seedAttendances } = require('./data/seedAttendance');
const { Attendance } = require('./models/Attendance');
const { User } = require('./models/User');

const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json()); // To parse JSON request bodies

connectDB().then(async () => {
  await seedUsers();  
  await seedClasses();  
  await seedAttendances();  

  const PORT = process.env.PORT || 5000;;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((error) => {
  console.error(`Error while connecting to the database: ${error.message}`);
});

app.use('/api/user', loginRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/nfc', nfcRoutes);

// Ruta za NFC
// app.post('/nfc', (req, res) => {
//   const uid = req.body.uid; // Izvlaci UID iz requesta

//   if (uid) {
//     console.log(`Received NFC UID: ${uid}`); // Ispisi u terminalu UID
    
//     res.status(200).send({ message: 'UID received successfully' }); // Upsjesno primljen UID
//   } else {
//     res.status(400).send({ message: 'UID is missing' }); // Ako mu nema UID-a, vrati gresku
//   }
// });

app.post('/nfc', (req, res) => {
  const { uid } = req.body; // Extract UID from the request body
  console.log(`Received UID: ${uid}`);

  if (!uid) {
    return res.status(400).send({ message: 'UID is missing' });
  }
  // Find the user by studentId (which is the NFC UID)
  User.findOne({ uid: uid })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      // Create an attendance record using the user's `otherId`
      const attendance = new Attendance({
        studentId: uid, // The UID is used as the student's ID
        classId: '678fc73771e8cb87c6f0dd48', // Replace with the actual class ID
        status: 'Prisutan', // Hardcoded attendance status
        otherId: user._id, // Using `otherId` from the found user
      });

      // Save the attendance record to the database
      attendance.save()
        .then(() => {
          console.log(`Attendance recorded for UID: ${uid}`);
          res.status(200).send({ message: 'UID received and attendance recorded successfully' });
        })
        .catch((error) => {
          console.error('Error recording attendance:', error);
          res.status(500).send({ message: 'Server error' });
        });
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).send({ message: 'Server error' });
    });
});
