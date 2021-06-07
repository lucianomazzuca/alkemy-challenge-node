const UserAlreadyExistsError = require("../../../shared/error/user/UserAlreadyExistsError");

module.exports = class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res, next) {
    const user = req.body;

    try {
      await this.authService.register(user);
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        return res.status(400).json({ error: e.message });
      }

      next(e);
    }

    return res.status(201).json({ msg: "success" });
  };

  async login(req, res, next) {
    res.send('hello')
  }
};
