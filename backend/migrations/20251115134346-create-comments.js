import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('Comments', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    houseId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Houses', key: 'id' }, onDelete: 'CASCADE' },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    request: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    seen: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() },
    updatedAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date() }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Comments');
}
