import { buildingAmenities } from '../data/propertyJSON.js';

export async function up(queryInterface) {
  const data = buildingAmenities.map(amenity => ({ amenity, createdAt: new Date(), updatedAt: new Date() }));
  await queryInterface.bulkInsert('BuildingAmenities', data, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('BuildingAmenities', null, {});
}
