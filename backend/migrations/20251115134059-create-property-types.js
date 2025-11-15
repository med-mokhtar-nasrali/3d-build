import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('PropertyTypes', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    idealFor: { type: DataTypes.TEXT },
    createdAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() },
    updatedAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('PropertyTypes');
}
