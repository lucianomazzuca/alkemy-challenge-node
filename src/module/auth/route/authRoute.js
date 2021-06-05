const express = require("express");
const loginValidator = require('../middleware/loginValidator');
const registerValidator = require('../middleware/loginValidator');
const validatorHandler = require('../../../shared/middleware/validationHandler');

const router = express.Router();

function configureRouter(authController) {
  router.get('/', authController.index.bind(authController));
  router.get('/register', authController.register.bind(authController));
  return router;
}

module.exports = configureRouter;