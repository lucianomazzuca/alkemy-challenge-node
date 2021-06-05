const chai = require("chai");

const { expect } = chai;
chai.use(require("chai-as-promised"));
const sequelizeInstance = require("../../../../config/sequelize");

const MovieModel = require("../../../movie/model/movieModel");
const GenreModel = require("../../../genre/model/genreModel");
const CharacterModel = require("../../model/characterModel");
const CharacterRepository = require("../characterRepository");

const createCharacterTest = require("../../fixture/characterFixture");
const createMovieTest = require("../../../movie/fixture/movieFixture");
const NotFoundError = require("../../../../shared/error/NotFoundError");

describe("Character repository methods", () => {
  let characterRepository;
  let movieModel;
  let characterModel;
  let genreModel;

  beforeEach(async () => {
    await sequelizeInstance.drop();

    // Setup Models
    characterModel = CharacterModel.setup(sequelizeInstance);
    movieModel = MovieModel.setup(sequelizeInstance);
    genreModel = GenreModel.setup(sequelizeInstance);

    characterModel.setupAssociation(movieModel);
    movieModel.setupAssociation(characterModel, genreModel);

    // Instantiate repository
    characterRepository = new CharacterRepository(characterModel, movieModel);

    await sequelizeInstance.sync({ force: true });
  });

  describe("save method", () => {
    it("should add a new character to the db", async () => {
      const character = createCharacterTest();
      await characterRepository.save(character);

      const characterInDb = await characterModel.findByPk(1);
      expect(characterInDb.id).to.equal(1);
      expect(characterInDb.name).to.equal(character.name);
    });

    it("should update an existing character in the db", async () => {
      const character = createCharacterTest();
      await characterRepository.save(character);

      character.id = 1;
      character.name = "Bruce Wayne";
      await characterRepository.save(character);

      const characterInDb = await characterModel.findByPk(1);
      expect(characterInDb.id).to.equal(1);
      expect(characterInDb.name).to.equal("Bruce Wayne");
    });
  });

  describe("getAll method", async () => {
    it("should return all characters in the db with movies associated", async () => {
      // Create character in db
      const character = createCharacterTest();
      await characterRepository.save(character);
      await characterRepository.save(character);

      // Create movie with character associated in db
      const movie = createMovieTest();
      const movieBuild = movieModel.build(movie);
      await movieBuild.save();
      await movieBuild.setCharacters([1]);

      const characters = await characterRepository.getAll();
      expect(characters).to.have.lengthOf(2);
      expect(characters[0].id).to.equal(1);
      expect(characters[0].movies).to.have.lengthOf(1);
      expect(characters[0].movies[0].id).to.equal(1);
      expect(characters[0].movies[0].name).to.equal(movie.name);
    });
  });

  describe("getById method", () => {
    it("should return the first chracter in the db", async () => {
      // Create genre in db
      const character = createCharacterTest();
      await characterRepository.save(character);

      // Create movie with character associated in db
      const movie = createMovieTest();
      const movieBuild = movieModel.build(movie);
      await movieBuild.save();
      await movieBuild.setCharacters([1]);

      const characterInDB = await characterRepository.getById(1);
      expect(characterInDB.id).to.equal(1);
      expect(characterInDB.name).to.equal(character.name);
      expect(characterInDB.movies).to.have.lengthOf(1);
      expect(characterInDB.movies[0].id).to.equal(1);
    });

    it("should throw error when the character is not found", async () => {
      await expect(characterRepository.getById(1)).to.be.rejectedWith(
        NotFoundError
      );
    });
  });

  describe("delete method", () => {
    it("should delete a genre from the db and return true", async () => {
      // Create genres in db
      const character = createCharacterTest();
      await characterRepository.save(character);
      await characterRepository.save(character);

      const isDeleted = await characterRepository.delete(1);
      expect(isDeleted).to.equal(true);

      const charactersInDb = await characterModel.findAll();
      expect(charactersInDb).to.have.lengthOf(1);
    });

    it("should return false when the genre doesn't exist in the db", async () => {
      const isDeleted = await characterRepository.delete(1);
      expect(isDeleted).to.equal(false);
    });
  });
});
