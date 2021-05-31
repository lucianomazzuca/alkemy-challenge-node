const { expect } = require("chai");

const { Sequelize } = require("sequelize");

const MovieModel = require('../../model/movieModel');
const MovieRepository = require('../movieRepository');
const createMovieTest = require('../../fixture/productFixture');

describe("Movie repository methods", () => {
  let movieRepository;
  let movieModel;

  before(async () => {
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
    })
  })
})