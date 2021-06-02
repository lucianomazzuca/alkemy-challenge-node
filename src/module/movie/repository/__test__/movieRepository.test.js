const { expect } = require("chai");

const { Sequelize } = require("sequelize");

const CharacterModel = require("../../../character/model/characterModel");
const GenreModel = require("../../../genre/model/genreModel");
const MovieModel = require("../../model/movieModel");
const MovieRepository = require("../movieRepository");

const createMovieTest = require("../../fixture/movieFixture");
const createCharacterTest = require("../../../character/fixture/characterFixture");

describe("Movie repository methods", () => {
  let movieRepository;
  let movieModel;
  let characterModel;
  let genreModel;
  beforeEach(async () => {
    // Setup DB in memory
    const sequelizeInstance = new Sequelize("sqlite::memory", {
      logging: false,
    });

    // Setup Models
    movieModel = MovieModel.setup(sequelizeInstance);
    characterModel = CharacterModel.setup(sequelizeInstance);
    genreModel = GenreModel.setup(sequelizeInstance);
    movieModel.setupAssociation(characterModel, genreModel);

    // Instantiate repository
    movieRepository = new MovieRepository(movieModel);

    await sequelizeInstance.sync({ force: true });
  });

  describe("save method", () => {
    it("should add a movie with a character associatied", async () => {
      // Create a character in the db
      const character = createCharacterTest();
      await characterModel.create(character);

      // Create Movie with character id
      const movie = createMovieTest();
      await movieRepository.save(movie, [1]);

      const savedMovie = await movieModel.findByPk(1, {
        include: [{ model: characterModel, as: "characters" }],
      });

      expect(savedMovie.id).to.equal(1);
      expect(savedMovie.characters[0].id).to.equal(1);
      expect(savedMovie.characters[0].name).to.equal(character.name);
    });


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

  describe("delete method", () => {
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
  });
});
