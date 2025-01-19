const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const loginRoutes = require('./routes/loginRoutes');
const { seedUsers } = require('./data/seeder');

const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json()); // To parse JSON request bodies

connectDB().then(async () => {
  await seedUsers();  

  const PORT = process.env.PORT || 5000;;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((error) => {
  console.error(`Error while connecting to the database: ${error.message}`);
});

app.use('/api/user', loginRoutes);