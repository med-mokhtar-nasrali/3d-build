export default (sequelize, DataTypes) => {
  return sequelize.define("House", {
    number: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
  });
};
