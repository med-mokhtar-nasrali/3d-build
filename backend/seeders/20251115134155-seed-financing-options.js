import { financingOptions } from '../data/propertyJSON.js';

export async function up(queryInterface) {
  const data = financingOptions.map(option => ({ option, createdAt: new Date(), updatedAt: new Date() }));
  await queryInterface.bulkInsert('FinancingOptions', data, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('FinancingOptions', null, {});
}
