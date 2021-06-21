const sequelizeInstance = require("../../config/sequelize");

const configureRouter = require("./route/movieRoute");
const MovieController = require("./controller/movieController");
const MovieService = require("./service/movieService");
const MovieRepository = require("./repository/movieRepository");
const MovieModel = require("./model/movieModel");

// const MovieModel = require("./model/movieModel");

// Instantiate dependencies
const movieModel = MovieModel.setup(sequelizeInstance);
// movieModel.setupAssociation(movieModel, genreModel);
const movieRepository = new MovieRepository(movieModel, movieModel);
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);
const movieRouter = configureRouter(movieController);

function initMovieModule(app) {
  app.use("/movies", movieRouter);
}

module.exports = {
  initMovieModule,
  movieModel,
};
