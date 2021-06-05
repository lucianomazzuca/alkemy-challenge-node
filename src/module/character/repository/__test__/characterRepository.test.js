const chai = require("chai");

const { expect } = chai;
chai.use(require("chai-as-promised"));
const sequelizeInstance = require("../../../../config/sequelize");

const MovieModel = require("../../../movie/model/movieModel");
const CharacterModel = require("../../model/characterModel");
const CharacterRepository = require("../characterRepository");

const createCharacterTest = require("../../fixture/characterFixture");
const NotFoundError = require("../../../../shared/error/NotFoundError");

describe("Character repository methods", () => {
  let characterRepository;
  let movieModel;
  let characterModel;

  beforeEach(async () => {
    await sequelizeInstance.drop();

    // Setup Models
    characterModel = CharacterModel.setup(sequelizeInstance);
    movieModel = MovieModel.setup(sequelizeInstance);
    characterModel.setupAssociation(movieModel);

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
    })
  })
});
