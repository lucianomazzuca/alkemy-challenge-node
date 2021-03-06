const chai = require("chai");

const { expect } = chai;
chai.use(require("chai-as-promised"));

const sequelize = require("../../../../config/sequelize");

const MovieRepository = require("../movieRepository");

const createMovieTest = require("../../fixture/movieFixture");
const createCharacterTest = require("../../../character/fixture/characterFixture");
const createGenreTest = require("../../../genre/fixture/genreFixture");
const NotFoundError = require("../../../../shared/error/NotFoundError");

describe("Movie repository methods", () => {
  const movieModel = sequelize.models.Movie;
  const characterModel = sequelize.models.Character;
  const genreModel = sequelize.models.Genre;
  
  const movieRepository = new MovieRepository(
    movieModel,
    characterModel,
    genreModel
  );

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe("save method", () => {
    it("should add a movie with a genre and character associated", async () => {
      // Create a genre in the db
      const genre = createGenreTest();
      await genreModel.create(genre);

      // Create a character in the db
      const character = createCharacterTest();
      await characterModel.create(character);

      // Create Movie with genre id
      const movie = createMovieTest();
      await movieRepository.save(movie, [1], [1]);

      const savedMovie = await movieModel.findByPk(1, {
        include: [
          { model: genreModel, as: "genres" },
          { model: characterModel, as: "characters" },
        ],
      });

      expect(savedMovie.id).to.equal(1);
      expect(savedMovie.characters[0].id).to.equal(1);
      expect(savedMovie.characters[0].name).to.equal(character.name);
      expect(savedMovie.genres[0].id).to.equal(1);
      expect(savedMovie.genres[0].name).to.equal(genre.name);
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

    it("returns false when there is no movie with that id", async () => {
      const isDeleted = await movieRepository.delete(1);
      expect(isDeleted).to.equal(false);

      const moviesInDb = await movieModel.findAll();
      expect(moviesInDb).to.have.lengthOf(0);
    });
  });

  describe("getById method", () => {
    it("returns a movie with characters associated", async () => {
      // Create a character in the db
      const character = createCharacterTest();
      await characterModel.create(character);

      // Create Movie with genre id
      const movie = createMovieTest();
      await movieRepository.save(movie, [1], undefined);

      const savedMovie = await movieRepository.getById(1);
      expect(savedMovie.characters[0].id).to.equal(1);
      expect(savedMovie.characters[0].name).to.equal(character.name);
    });

    it("should throw error when the movie is not found", async () => {
      await expect(movieRepository.getById(1)).to.be.rejectedWith(
        NotFoundError
      );
    });
  });
});
