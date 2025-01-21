const { User } = require('../models/User');
const users = require('./seedUsers');
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

module.exports = {
  seedUsers,
};