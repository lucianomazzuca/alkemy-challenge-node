const { DataTypes, Model } = require("sequelize");

module.exports = class Genre extends Model {
  static setup(sequelizeInstance) {
    Genre.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize: sequelizeInstance,
        underscored: true,
        tableName: "genres",
        modelName: "Genre",
      }
    );

    return Genre;
  }
}