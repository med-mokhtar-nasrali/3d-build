import { users } from '../data/users.js';
import bcrypt from 'bcrypt';

export async function up(queryInterface) {
  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  );

  await queryInterface.bulkInsert('Users', hashedUsers, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', null, {});
}
