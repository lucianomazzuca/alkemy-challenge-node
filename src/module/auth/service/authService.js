const UserAlreadyExistsError = require("../../../shared/error/user/UserAlreadyExistsError");
const UserWrongCredentialsError = require("../../../shared/error/user/UserWrongCredentialsError");
const NotFoundError = require('../../../shared/error/NotFoundError');

module.exports = class AuthService {
  constructor(userRepository, bcrypt) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
  }

  async register(user) {
    // Check if an user with the given name already exists
    const userRegistered = await this.userRepository.getByName(user.name);
    if (userRegistered) {
      throw new UserAlreadyExistsError(`This name is already in use`);
    }

    const userToSave = user;
    userToSave.password = await this.encryptPassword(userToSave.password);
    await this.userRepository.save(userToSave);
  }

  async encryptPassword(password) {
    const salt = await this.bcrypt.genSalt(10);
    const hash = await this.bcrypt.hash(password, salt);
    return hash;
  }

  async checkPassword(password, hash) {
    const result = await this.bcrypt.compare(password, hash);
    if (!result) {
      throw new UserWrongCredentialsError();
    }
    return result;
  };
};
