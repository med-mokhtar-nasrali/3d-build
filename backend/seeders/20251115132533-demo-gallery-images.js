import { galleryImages } from '../data/galleryImages.js';

export async function up(queryInterface) {
  const dataWithTimestamps = galleryImages.map(src => ({
    src,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  await queryInterface.bulkInsert('GalleryImages', dataWithTimestamps, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('GalleryImages', null, {});
}
