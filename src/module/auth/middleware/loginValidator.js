const { body } = require('express-validator');

const loginValidatorRules = [
  body('name').trim().notEmpty().withMessage("Name can't be empty"),
  body('password').trim().notEmpty().withMessage("Password can't be empty")
];

module.exports = loginValidatorRules