const sequelizeInstance = require("../../config/sequelize");

const GenreModel = require('./model/genreModel');

const genreModel = GenreModel.setup(sequelizeInstance);
// genreModel.setupAssociation(movieModel);

module.exports = {
  genreModel,
}