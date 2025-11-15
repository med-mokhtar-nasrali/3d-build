import { propertyTypes } from '../data/propertyJSON.js';

export async function up(queryInterface) {
  const typesData = Object.entries(propertyTypes).map(([code, data]) => ({
    code, name: data.name, description: data.description, idealFor: data.idealFor, createdAt: new Date(), updatedAt: new Date()
  }));
  await queryInterface.bulkInsert('PropertyTypes', typesData, {});

  const allTypes = await queryInterface.sequelize.query('SELECT id, code FROM PropertyTypes;', { type: queryInterface.sequelize.QueryTypes.SELECT });

  const featuresData = [];
  allTypes.forEach(pt => propertyTypes[pt.code].features.forEach(feature => {
    featuresData.push({ propertyTypeId: pt.id, feature, createdAt: new Date(), updatedAt: new Date() });
  }));

  await queryInterface.bulkInsert('PropertyTypeFeatures', featuresData, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('PropertyTypeFeatures', null, {});
  await queryInterface.bulkDelete('PropertyTypes', null, {});
}
