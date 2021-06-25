const express = require("express");
const uploadImage = require("../../../shared/middleware/uploadImage");
const movieValidator = require("../middleware/movieValidator");
const validatorHandler = require("../../../shared/middleware/validationHandler");

const router = express.Router();

function configureRouter(movieController) {
  router.post(
    "/",
    uploadImage,
    movieValidator,
    validatorHandler,
    movieController.create.bind(movieController)
  );
  router.get("/", movieController.getAll.bind(movieController));
  router.get("/:id", movieController.getById.bind(movieController));
  router.delete("/:id", movieController.delete.bind(movieController));
  router.put(
    "/:id",
    uploadImage,
    movieValidator,
    validatorHandler,
    movieController.edit.bind(movieController)
  );

  return router;
}

module.exports = configureRouter;
