const { DataTypes, Model } = require("sequelize");

module.exports = class MovieGenre extends Model {
  static setup(sequelizeInstance) {
    MovieGenre.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        movie_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        genre_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        underscored: true,
        modelName: "MovieGenre",
        tableName: "movies_genres",
        timestamps: false,
      }
    );

    return MovieGenre
  }
}