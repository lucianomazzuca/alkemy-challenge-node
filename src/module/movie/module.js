const sequelizeInstance = require('../../config/sequelize');

const MovieModel = require('./model/movieModel');

// Instantiate dependencies
const movieModel = MovieModel.setup(sequelizeInstance);

module.exports = {
  movieModel
}