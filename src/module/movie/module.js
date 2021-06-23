const { models } = require("../../config/sequelize");

const configureRouter = require("./route/movieRoute");
const MovieController = require("./controller/movieController");
const MovieService = require("./service/movieService");
const MovieRepository = require("./repository/movieRepository");

// Instantiate dependencies
const movieRepository = new MovieRepository(models.Movie, models.Character);
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);
const movieRouter = configureRouter(movieController);

function initMovieModule(app) {
  app.use("/movies", movieRouter);
}

module.exports = {
  initMovieModule,
};
