const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('./models/User');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://0.0.0.0:27017/nfc_attendance', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Read data from JSON file
    const filePath = path.join(__dirname, 'data', 'users.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Hash the passwords before inserting into the database
    const hashedData = await Promise.all(
      jsonData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword }; // Replace plain password with the hashed password
      })
    );

    // Insert users into the database
    await User.insertMany(hashedData);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after seeding
    process.exit(); // Exit the process after the seeding is done
  }
};

seedData();
