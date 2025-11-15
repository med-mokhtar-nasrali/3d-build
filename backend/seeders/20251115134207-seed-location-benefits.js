import { locationBenefits } from '../data/propertyJSON.js';

export async function up(queryInterface) {
  const data = locationBenefits.map(benefit => ({ benefit, createdAt: new Date(), updatedAt: new Date() }));
  await queryInterface.bulkInsert('LocationBenefits', data, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('LocationBenefits', null, {});
}
