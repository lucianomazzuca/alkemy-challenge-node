const { body } = require('express-validator');

const loginValidatorRules = [
  body("mail").trim().notEmpty().withMessage("Email is empty"),
  body("password").trim().notEmpty().withMessage("Password can't be empty"),
];

module.exports = loginValidatorRules