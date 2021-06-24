const { models } = require("../../config/sequelize");

const configureRouter = require("./route/characterRoute");
const CharacterController = require("./controller/characterController");
const CharacterService = require("./service/characterService");
const CharacterRepository = require("./repository/characterRepository");

// Instantiate dependencies
const characterRepository = new CharacterRepository(models.Character, models.Movie);
const characterService = new CharacterService(characterRepository);
const characterController = new CharacterController(characterService);
const characterRouter = configureRouter(characterController);

function initCharacterModule(app) {
  app.use("/characters", characterRouter);
}

module.exports = {
  initCharacterModule,
  characterService
};
