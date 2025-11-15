import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('ContactInfo', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    viewingSchedule: { type: DataTypes.STRING, allowNull: false },
    responseTime: { type: DataTypes.STRING, allowNull: false },
    createdAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() },
    updatedAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('ContactInfo');
}
