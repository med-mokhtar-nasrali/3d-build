import { comments } from '../data/comments.js';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS"
}

export async function up(queryInterface) {
  const data = comments.map(c => ({
    ...c,
    date: formatDate(c.date),
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  await queryInterface.bulkInsert('Comments', data, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Comments', null, {});
}
