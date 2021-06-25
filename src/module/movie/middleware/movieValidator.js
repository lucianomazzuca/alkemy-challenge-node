const { body } = require("express-validator");

const movieValidatorRules = [
  body("title").trim().notEmpty().withMessage("Title can't be empty"),
  body("release_date").isISO8601().withMessage("Must be a valid date"),
  body("score").trim().isFloat({min:1,max:5}).withMessage("Score must be a number between 1 and 5")
];

module.exports = movieValidatorRules;
