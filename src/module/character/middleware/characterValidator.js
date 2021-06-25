const { body } = require("express-validator");

const characterValidatorRules = [
  body("name").trim().notEmpty().withMessage("Name is empty"),
  body("age").trim().notEmpty().withMessage("Age can't be empty"),
  body("weight").trim().notEmpty().withMessage("Weight can't be empty"),
  body("story").trim().notEmpty().withMessage("Story can't be empty"),
];

module.exports = characterValidatorRules;
