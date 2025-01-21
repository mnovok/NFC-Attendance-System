const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const loginRoutes = require('./routes/loginRoutes');
const attendanceRoutes = require('./routes/attendance');
const { seedUsers } = require('./data/seeder');
const { seedClasses } = require('./data/seedClasses');
const { seedAttendances } = require('./data/seedAttendance');

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

// Ruta za NFC
app.post('/nfc', (req, res) => {
  const uid = req.body.uid; // Izvlaci UID iz requesta

  if (uid) {
    console.log(`Received NFC UID: ${uid}`); // Ispisi u terminalu UID
    res.status(200).send({ message: 'UID received successfully' }); // Upsjesno primljen UID
  } else {
    res.status(400).send({ message: 'UID is missing' }); // Ako mu nema UID-a, vrati gresku
  }
});