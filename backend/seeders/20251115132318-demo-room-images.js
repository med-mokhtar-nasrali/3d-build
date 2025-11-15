import { roomImages } from '../data/roomImages.js';

export async function up(queryInterface) {
  const dataWithTimestamps = roomImages.map(src => ({
    src,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  await queryInterface.bulkInsert('RoomImages', dataWithTimestamps, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('RoomImages', null, {});
}
