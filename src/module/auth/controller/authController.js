module.exports = class AuthController {
  constructor(authService) {
    this.authService = authService;
  };

  async index(req, res) {
    res.send('hello world')
  }
}