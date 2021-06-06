const UserAlreadyExistsError = require("../../../shared/error/user/UserAlreadyExistsError");

module.exports = class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(user) {
    // Check if an user with the given name already exists
    const userRegistered = await this.userService.getByName(user.name);
    if (userRegistered) {
      throw new UserAlreadyExistsError(`This name is already in use`);
    }

    const userToSave = user;
    userToSave.password = await this.authService.encryptPassword(user.password);
    await this.userRepository.save(userToSave);
  };

};
