const express = require("express");

const router = express.Router();

function configureRouter(authController) {
  router.get('/', authController.index.bind(authController));

  return router;
}

module.exports = configureRouter;