const User = require('../models/User');
const users = require('./seedUsers');
const bcrypt = require('bcryptjs'); 

const seedUsers = async () => {
    try {  
      for (const userData of users) {
          const existingUser = await User.findOne({
            $or: [{ email: userData.email }],
          });
    
          if (existingUser) {
            console.log(`User with email "${userData.email}" alredy exists. Skipped adding.`);
            continue;
          }

          const hashedPassword = await bcrypt.hash(userData.password, 10);
  
          await User.create({
            email: userData.email,
            name: userData.name,
            surname: userData.surname,
            password: hashedPassword,
            role: userData.role,
          });
    
          console.log(`User "${userData.email}" successfully added to db.`);
        }
      } catch (error) {
      console.error("Error while seeding users:", error);
    }
};

module.exports = {
    seedUsers,
};