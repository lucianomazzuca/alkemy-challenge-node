const sequelizeInstance = require('../../config/sequelize');
const UserRepository = require('./repository/userRepository');
const UserModel = require('./model/userModel');

const userModel = UserModel.setup(sequelizeInstance);
const userRepository = new UserRepository(userModel);

module.exports = {
  userRepository,
  userModel
}