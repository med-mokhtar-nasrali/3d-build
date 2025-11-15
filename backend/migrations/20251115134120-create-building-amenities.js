import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('BuildingAmenities', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    amenity: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() },
    updatedAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('BuildingAmenities');
}
