const sequelizeInstance = require("../../config/sequelize");

const configureRouter = require("./route/genreRoute");
const GenreController = require("./controller/genreController");
const GenreService = require("./service/genreService");
const GenreRepository = require("./repository/genreRepository");
const GenreModel = require("./model/genreModel");

const { movieModel } = require("../movie/module");

const genreModel = GenreModel.setup(sequelizeInstance);
genreModel.setupAssociation(movieModel);

const genreRepository = new GenreRepository(genreModel, movieModel);
const genreService = new GenreService(genreRepository);
const genreController = new GenreController(genreService);
const genreRouter = configureRouter(genreController);

function initGenreModule(app) {
  app.use("/genres", genreRouter);
}

module.exports = {
  initGenreModule,
  genreModel,
};
