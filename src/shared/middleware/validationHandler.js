const { validationResult } = require('express-validator');

const validationHandler = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  };

  return res.status(400).json({
    errors: error.errors
  })
}

module.exports = validationHandler;