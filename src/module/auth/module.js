const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const configureRouter = require("./route/authRoute");
const AuthController = require("./controller/authController");
const AuthService = require("./service/authService");
const { userRepository } = require("../user/module");
const { mailService } = require('../mail/module');

// instantiate
const authService = new AuthService(userRepository, bcrypt, jwt);
const authController = new AuthController(authService, userRepository, mailService);
const authRouter = configureRouter(authController);

function initAuthModule(app) {
  app.use("/auth", authRouter);
}

module.exports = {
  initAuthModule,
};
