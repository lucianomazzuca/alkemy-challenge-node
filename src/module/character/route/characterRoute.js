const express = require("express");
const characterValidator = require("../middleware/characterValidator");
const validatorHandler = require("../../../shared/middleware/validationHandler");
const uploadImage = require("../../../shared/middleware/uploadImage");

const router = express.Router();

function configureRouter(characterController) {
  router.post(
    "/",
    uploadImage,
    characterValidator,
    validatorHandler,
    characterController.create.bind(characterController)
  );

  router.get("/", characterController.getAll.bind(characterController));

  router.get("/:id", characterController.getById.bind(characterController));

  router.delete("/:id", characterController.delete.bind(characterController));

  router.put(
    "/:id",
    uploadImage,
    characterValidator,
    validatorHandler,
    characterController.edit.bind(characterController)
  );

  return router;
}

module.exports = configureRouter;
