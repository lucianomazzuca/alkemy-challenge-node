const { models } = require("../../config/sequelize");

const configureRouter = require("./route/genreRoute");
const GenreController = require("./controller/genreController");
const GenreService = require("./service/genreService");
const GenreRepository = require("./repository/genreRepository");

// Instantiate dependencies
const genreRepository = new GenreRepository(models.Genre, models.Movie);
const genreService = new GenreService(genreRepository);
const genreController = new GenreController(genreService);
const genreRouter = configureRouter(genreController);

function initGenreModule(app) {
  app.use("/genres", genreRouter);
}

module.exports = {
  initGenreModule,
};
