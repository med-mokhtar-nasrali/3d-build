import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('PropertyTypeFeatures', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    propertyTypeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'PropertyTypes', key: 'id' }, onDelete: 'CASCADE' },
    feature: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() },
    updatedAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('PropertyTypeFeatures');
}
