// const MovieModel = require('../module/movie/model/movieModel');
// const GenreModel = require('../module/genre/model/genreModel');
// const CharacterModel = require('../module/character/model/characterModel');

const { movieModel } = require("../module/movie/module");
const { genreModel } = require("../module/genre/module");
const { characterModel } = require("../module/character/module");

function setupAssociations() {
  movieModel.setupAssociation(characterModel, genreModel);
  genreModel.setupAssociation(movieModel);
  characterModel.setupAssociation(movieModel);
}

module.exports = setupAssociations;
