const UserAlreadyExistsError = require("../../../shared/error/user/UserAlreadyExistsError");
const UserWrongCredentialsError = require("../../../shared/error/user/UserWrongCredentialsError");

module.exports = class AuthController {
  constructor(authService, userRepository, mailService) {
    this.authService = authService;
    this.userRepository = userRepository;
    this.mailService = mailService;
  }

  async register(req, res, next) {
    const user = req.body;

    try {
      await this.authService.register(user);
      await this.mailService.sendMail(user.mail);
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        return res.status(400).json({ error: e.message });
      }

      next(e);
    }

    return res.status(201).json({ msg: "success" });
  }

  async login(req, res, next) {
    const user = req.body;
    try {
      // search user name in db
      const userRegistered = await this.userRepository.getByMail(user.mail);
      if (!userRegistered) {
        throw new UserWrongCredentialsError(`Email ${user.mail} is not registered`);
      }
  
      // check passwords
      await this.authService.checkPassword(
        user.password,
        userRegistered.password
      );

      // send jwt
      const jwt = await this.authService.generateJwt(user.mail);
      return res.status(200).json({token: jwt})

    } catch(e) {
      if (e instanceof UserWrongCredentialsError) {
        return res.status(401).json({ error: e.message })
      }
      next(e)
    }

  }
};
