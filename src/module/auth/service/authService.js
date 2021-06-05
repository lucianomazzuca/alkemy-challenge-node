module.exports = class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
}