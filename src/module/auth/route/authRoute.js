const express = require("express");
const loginValidator = require('../middleware/loginValidator');
const registerValidator = require('../middleware/registerValidator');
const validatorHandler = require('../../../shared/middleware/validationHandler');

const router = express.Router();

function configureRouter(authController) {
  router.post('/register', registerValidator, validatorHandler, authController.register.bind(authController));
  router.post('/login', loginValidator, validatorHandler, authController.login.bind(authController));

  return router;
}

module.exports = configureRouter;