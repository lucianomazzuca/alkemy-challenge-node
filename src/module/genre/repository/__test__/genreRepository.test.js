const chai = require("chai");

const { expect } = chai;
chai.use(require("chai-as-promised"));
const sequelizeInstance = require("../../../../config/sequelize");

const MovieModel = require("../../../movie/model/movieModel");
const CharacterModel = require("../../../character/model/characterModel");
const GenreModel = require("../../model/genreModel");
const GenreRepository = require("../genreRepository");

const createGenreTest = require("../../fixture/genreFixture");
const createMovieTest = require("../../../movie/fixture/movieFixture");
const NotFoundError = require("../../../../shared/error/NotFoundError");

// Setup DB in memory

describe("Genre repository methods", () => {
  let genreRepository;
  let genreModel;
  let movieModel;
  let characterModel;

  beforeEach(async () => {
    await sequelizeInstance.drop();

    // Setup Models
    genreModel = GenreModel.setup(sequelizeInstance);
    movieModel = MovieModel.setup(sequelizeInstance);
    characterModel = CharacterModel.setup(sequelizeInstance);
    genreModel.setupAssociation(movieModel);
    movieModel.setupAssociation(characterModel, genreModel);

    // Instantiate repository
    genreRepository = new GenreRepository(genreModel, movieModel);

    await sequelizeInstance.sync({ force: true });
  });

  after(async () => {
    await sequelizeInstance.truncate();
  })


  describe("Save method", () => {
    it("should add a new genre to the db", async () => {
      const genre = createGenreTest();
      await genreRepository.save(genre);

      const savedGenre = await genreModel.findByPk(1);
      expect(savedGenre.id).to.equal(1);
      expect(savedGenre.name).to.equal("Action");
    });

    it("should update an existing genre in the db", async () => {
      let genre = createGenreTest();
      await genreRepository.save(genre);

      genre = {
        id: 1,
        name: "Adventure",
        image: "test",
      };

      await genreRepository.save(genre);

      const savedGenre = await genreModel.findByPk(1);
      expect(savedGenre.id).to.equal(1);
      expect(savedGenre.name).to.equal("Adventure");
    });
  });

  describe("getAll method", () => {
    it("should return all genres in the db with movies associated", async () => {
      // Create genre in db
      const genre = createGenreTest();
      await genreRepository.save(genre);
      await genreRepository.save(genre);

      // Create movie with genre associated in db
      const movie = createMovieTest();
      const movieBuild = movieModel.build(movie);
      await movieBuild.save();
      await movieBuild.setGenres([1]);

      const genres = await genreRepository.getAll();
      expect(genres).to.have.lengthOf(2);
      expect(genres[0].id).to.equal(1);
      expect(genres[0].movies).to.have.lengthOf(1);
      expect(genres[0].movies[0].id).to.equal(1);
      expect(genres[0].movies[0].name).to.equal(movie.name);
    });
  });

  describe("getById method", () => {
    it("should return the first movie in the db", async () => {
      // Create genre in db
      const genre = createGenreTest();
      await genreRepository.save(genre);

      // Create movie with genre associated in db
      const movie = createMovieTest();
      const movieBuild = movieModel.build(movie);
      await movieBuild.save();
      await movieBuild.setGenres([1]);

      const genreInDB = await genreRepository.getById(1);
      expect(genreInDB.id).to.equal(1);
      expect(genreInDB.name).to.equal(genre.name);
      expect(genreInDB.movies).to.have.lengthOf(1);
      expect(genreInDB.movies[0].id).to.equal(1);
    });

    it("should throw error when the genre is not found", async () => {
      await expect(genreRepository.getById(1)).to.be.rejectedWith(
        NotFoundError
      );
    });
  });

  describe("delete method", () => {
    it("should delete a genre from the db and return true", async () => {
      // Create genres in db
      const genre = createGenreTest();
      await genreRepository.save(genre);
      await genreRepository.save(genre);

      const isDeleted = await genreRepository.delete(1);
      expect(isDeleted).to.equal(true);

      const genresInDb = await genreModel.findAll();
      expect(genresInDb).to.have.lengthOf(1);
    });

    it("should return false when the genre doesn't exist in the db", async () => {
      const isDeleted = await genreRepository.delete(1);
      expect(isDeleted).to.equal(false);
    });
  });
});
