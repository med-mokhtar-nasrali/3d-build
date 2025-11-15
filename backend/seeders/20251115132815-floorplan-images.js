import { floorPlanImages } from '../data/floorPlanImages.js';

export async function up(queryInterface) {
  const dataWithTimestamps = floorPlanImages.map(src => ({
    src,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  await queryInterface.bulkInsert('FloorPlanImages', dataWithTimestamps, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('FloorPlanImages', null, {});
}
