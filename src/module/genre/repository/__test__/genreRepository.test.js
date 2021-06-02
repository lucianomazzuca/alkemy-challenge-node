const { expect } = require("chai");

const { Sequelize } = require("sequelize");

const MovieModel = require("../../../movie/model/movieModel");
const CharacterModel = require("../../../character/model/characterModel");
const GenreModel = require("../../model/genreModel");
const GenreRepository = require("../genreRepository");

const createGenreTest = require("../../fixture/genreFixture");
const createMovieTest = require("../../../movie/fixture/movieFixture");

// Setup DB in memory
const sequelizeInstance = new Sequelize("sqlite::memory", {
  logging: false,
});

describe("Genre repository methods", () => {
  let genreRepository;
  let genreModel;
  let movieModel;
  let characterModel;
  beforeEach(async () => {
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

  describe("getAll method", async () => {
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
});
