const express = require("express");

const router = express.Router();

function configureRouter(characterController) {
  router.post(
    "/",
    characterController.create.bind(characterController)
  );

  return router;
}

module.exports = configureRouter;
