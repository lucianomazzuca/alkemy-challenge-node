const express = require("express");
const uploadImage = require("../../../shared/middleware/uploadImage");
const genreValidator = require("../middleware/genreValidator");
const validatorHandler = require("../../../shared/middleware/validationHandler");
const authenticateToken = require("../../../shared/middleware/authToken");

const router = express.Router();

function configureRouter(genreController) {
  router.post(
    "/",
    authenticateToken,
    uploadImage,
    genreValidator,
    validatorHandler,
    genreController.create.bind(genreController)
  );
  router.get(
    "/",
    authenticateToken,
    genreController.getAll.bind(genreController)
  );
  router.get(
    "/:id",
    authenticateToken,
    genreController.getById.bind(genreController)
  );
  router.delete(
    "/:id",
    authenticateToken,
    genreController.delete.bind(genreController)
  );
  router.put(
    "/:id",
    authenticateToken,
    uploadImage,
    genreValidator,
    validatorHandler,
    genreController.edit.bind(genreController)
  );

  return router;
}

module.exports = configureRouter;
