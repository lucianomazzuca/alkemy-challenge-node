const express = require("express");
const uploadImage = require("../../../shared/middleware/uploadImage");
const movieValidator = require("../middleware/movieValidator");
const validatorHandler = require("../../../shared/middleware/validationHandler");
const authenticateToken = require("../../../shared/middleware/authToken");

const router = express.Router();

function configureRouter(movieController) {
  router.post(
    "/",
    authenticateToken,
    uploadImage,
    movieValidator,
    validatorHandler,
    movieController.create.bind(movieController)
  );
  router.get(
    "/",
    authenticateToken,
    movieController.getAll.bind(movieController)
  );
  router.get(
    "/:id",
    authenticateToken,
    movieController.getById.bind(movieController)
  );
  router.delete(
    "/:id",
    authenticateToken,
    movieController.delete.bind(movieController)
  );
  router.put(
    "/:id",
    authenticateToken,
    uploadImage,
    movieValidator,
    validatorHandler,
    movieController.edit.bind(movieController)
  );

  return router;
}

module.exports = configureRouter;
