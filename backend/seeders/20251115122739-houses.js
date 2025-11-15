import { houses } from '../data/houses.js';

export async function up(queryInterface) {
  const dataWithTimestamps = houses.map(house => ({
    number: house.number,
    state: house.state,
    type: house.type,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  await queryInterface.bulkInsert('Houses', dataWithTimestamps, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Houses', null, {});
}
