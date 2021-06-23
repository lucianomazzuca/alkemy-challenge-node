const { Sequelize } = require("sequelize");

const MovieModel = require('../module/movie/model/movieModel'); 
const GenreModel = require('../module/genre/model/genreModel'); 
const CharacterModel = require('../module/character/model/characterModel'); 

let sequelize;

// Setup db
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize("sqlite::memory", { logging: false });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
    }
  );
}

// Setup Models

const movieModel = MovieModel.setup(sequelize);
const genreModel = GenreModel.setup(sequelize);
const characterModel = CharacterModel.setup(sequelize);

movieModel.setupAssociation(characterModel, genreModel);
genreModel.setupAssociation(movieModel);
characterModel.setupAssociation(movieModel);

module.exports = sequelize;
