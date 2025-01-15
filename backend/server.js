const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login'); // Import the login route

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

app.use('/login', loginRoute); // Register the login route

mongoose.connect('mongodb://127.0.0.:27017/nfc_attendance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
