const { body } = require("express-validator");

const registerValidatorRules = [
  body("password")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage("Password must contain between 5 and 20 characters"),
  body("name")
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Name must contain between 3 and 15 characters"),
];

module.exports = registerValidatorRules;
