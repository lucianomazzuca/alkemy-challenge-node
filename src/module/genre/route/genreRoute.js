const express = require("express");
const uploadImage = require("../../../shared/middleware/uploadImage");
const genreValidator = require("../middleware/genreValidator");
const validatorHandler = require("../../../shared/middleware/validationHandler");

const router = express.Router();

function configureRouter(genreController) {
  router.post(
    "/",
    uploadImage,
    genreValidator,
    validatorHandler,
    genreController.create.bind(genreController)
  );
  router.get("/", genreController.getAll.bind(genreController));
  router.get("/:id", genreController.getById.bind(genreController));
  router.delete("/:id", genreController.delete.bind(genreController));
  router.put(
    "/:id",
    uploadImage,
    genreValidator,
    validatorHandler,
    genreController.edit.bind(genreController)
  );

  return router;
}

module.exports = configureRouter;
