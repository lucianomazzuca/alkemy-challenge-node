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
    it("should return all movies in db", async () => {
      const movie = createMovieTest();
      await movieRepository.save(movie);
      await movieRepository.save(movie);

      const moviesInDb = await movieRepository.getAll();
      expect(moviesInDb).to.have.lengthOf(2);
      expect(moviesInDb[0].id).to.equal(1);
      expect(moviesInDb[1].id).to.equal(2);
    });
  });

  describe("deletem method", () => {
    it("delete removes a movie from db and returns true", async () => {
      const movie = createMovieTest();
      await movieRepository.save(movie);
      await movieRepository.save(movie);
  
      const isDeleted = await movieRepository.delete(1);
      expect(isDeleted).to.equal(true);
      
      const moviesInDb = await movieModel.findAll();
      expect(moviesInDb).to.have.lengthOf(1);
      expect(moviesInDb[0].id).to.equal(2);
    });

  })
});
