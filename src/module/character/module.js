const sequelizeInstance = require('../../config/sequelize');

const configureRouter = require('./route/characterRoute');
const CharacterController = require('./controller/characterController');
const CharacterService = require('./service/characterService');
const CharacterRepository = require('./repository/characterRepository');
const CharacterModel = require('./model/characterModel');

// Instantiate dependencies
const characterModel = CharacterModel.setup(sequelizeInstance);
const characterRepository = new CharacterRepository(characterModel);
const characterService = new CharacterService(characterRepository);
const characterController = new CharacterController(characterService);
const characterRouter = configureRouter(characterController);

function initCharacterModule(app) {
  app.use('/character', characterRouter);
};

module.exports = {
  initCharacterModule,
}