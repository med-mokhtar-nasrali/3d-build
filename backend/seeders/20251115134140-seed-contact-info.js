import { contactInfo } from '../data/propertyJSON.js';

export async function up(queryInterface) {
  await queryInterface.bulkInsert('ContactInfo', [{
    phone: contactInfo.phone,
    email: contactInfo.email,
    viewingSchedule: contactInfo.viewingSchedule,
    responseTime: contactInfo.responseTime,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('ContactInfo', null, {});
}
