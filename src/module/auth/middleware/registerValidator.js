const { body } = require("express-validator");

const registerValidatorRules = [
  body("mail").trim().isEmail().withMessage("You have to enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage("Password must contain between 5 and 20 characters"),
];

module.exports = registerValidatorRules;
