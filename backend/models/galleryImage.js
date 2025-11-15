export default (sequelize, DataTypes) => {
    return sequelize.define("GalleryImage", {
        houseId: { type: DataTypes.INTEGER, allowNull: false },
        src: { type: DataTypes.STRING, allowNull: false },
    });
};
