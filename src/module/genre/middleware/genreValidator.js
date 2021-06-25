const { body } = require("express-validator");

const genreValidatorRules = [
  body("name").trim().notEmpty().withMessage("Name is empty"),
];

module.exports = genreValidatorRules;
