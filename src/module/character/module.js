const sequelizeInstance = require("../../config/sequelize");

const configureRouter = require("./route/characterRoute");
const CharacterController = require("./controller/characterController");
const CharacterService = require("./service/characterService");
const CharacterRepository = require("./repository/characterRepository");
const CharacterModel = require("./model/characterModel");

const { movieModel } = require("../movie/module");

// Instantiate dependencies
const characterModel = CharacterModel.setup(sequelizeInstance);
characterModel.setupAssociation(movieModel);
const characterRepository = new CharacterRepository(characterModel, movieModel);
const characterService = new CharacterService(characterRepository);
const characterController = new CharacterController(characterService);
const characterRouter = configureRouter(characterController);

function initCharacterModule(app) {
  app.use("/characters", characterRouter);
}

module.exports = {
  initCharacterModule,
  characterModel
};
