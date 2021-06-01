const { DataTypes, Model } = require("sequelize");

module.exports = class Movie extends Model {
  static setup(sequelizeInstance) {
    Movie.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        release_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        score: {
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
        tableName: "movies",
        modelName: "Movie",
      }
    );
      
    return Movie;
  }

  static setupAssociation(CharacterModel, GenreModel) {
    Movie.belongsToMany(CharacterModel, {
      through: 'movies_characters',
      foreignKey: 'movie_id',
      as: 'characters',
      uniqueKey: 'id'
    })

    Movie.belongsToMany(GenreModel, {
      through: 'movies_genres',
      foreignKey: 'movie_id',
      as: 'genres',
      uniqueKey: 'id'
    })
  }
};
