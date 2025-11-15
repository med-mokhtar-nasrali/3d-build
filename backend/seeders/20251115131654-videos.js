import { videos } from '../data/videos.js';

export async function up(queryInterface) {
  const dataWithTimestamps = videos.map(video => ({
    ...video,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  await queryInterface.bulkInsert('Videos', dataWithTimestamps, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Videos', null, {});
}
