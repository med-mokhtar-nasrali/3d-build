export default (sequelize, DataTypes) => {
    return sequelize.define("RoomImage", {
        houseId: { type: DataTypes.INTEGER, allowNull: false },
        src: { type: DataTypes.STRING, allowNull: false },
    });
};
