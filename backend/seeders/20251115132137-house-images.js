import { houseImages } from '../data/houseImages.js';

export async function up(queryInterface) {
  const dataWithTimestamps = houseImages.map(img => ({
    src: img.src,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  await queryInterface.bulkInsert('HouseImages', dataWithTimestamps, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('HouseImages', null, {});
}
