// scripts/updateUserNames.ts
import User from '../model/User';
import sequelize from '../config/database';

async function updateUserNames() {
  await sequelize.authenticate();
  const users = await User.findAll({
    where: {
      name: null,
    },
  });

  for (const user of users) {
    user.name = 'Default Name'; // or any appropriate default value
    await user.save();
  }

  console.log('Updated users with null names.');
}

updateUserNames()
  .catch((error) => console.error('Error updating user names:', error.message))
  .finally(() => sequelize.close());
