const { expect } = require("chai");

const { Sequelize } = require("sequelize");

const MovieModel = require("../../model/movieModel");
const MovieRepository = require("../movieRepository");
const createMovieTest = require("../../fixture/movieFixture");

describe("Movie repository methods", () => {
  let movieRepository;
  let movieModel;

  beforeEach(async () => {
    // Setup DB in memory
    const sequelizeInstance = new Sequelize("sqlite::memory", {
      logging: false,
    });

    // Setup Models
    movieModel = MovieModel.setup(sequelizeInstance);

    // Instantiate repository
    movieRepository = new MovieRepository(movieModel);

    await sequelizeInstance.sync({ force: true });
  });

  describe("save method", () => {
    it("should add a new movie to the db", async () => {
      const movie = createMovieTest();
      await movieRepository.save(movie);

      const savedMovie = await movieModel.findByPk(1);
      expect(savedMovie.id).to.equal(1);
      expect(savedMovie.name).to.equal(movie.name);
    });

    it("should update an existing movie in the db", async () => {
      const movie = createMovieTest();

      await movieRepository.save(movie);

      movie.id = 1;
      movie.title = "Interstellar";

      await movieRepository.save(movie);

      const savedMovie = await movieModel.findByPk(1);
      expect(savedMovie.id).to.equal(1);
      expect(savedMovie.title).to.equal("Interstellar");
    });
  });

  describe("getAll method", () => {
    it("should return an array of two movies", async () => {
      const movie = createMovieTest();
      await movieRepository.save(movie);
      await movieRepository.save(movie);

      const moviesInDb = await movieRepository.getAll();
      console.log(moviesInDb)
      expect(moviesInDb).to.have.lengthOf(2)
    });
  });
});
