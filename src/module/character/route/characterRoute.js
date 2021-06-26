const express = require("express");
const characterValidator = require("../middleware/characterValidator");
const validatorHandler = require("../../../shared/middleware/validationHandler");
const uploadImage = require("../../../shared/middleware/uploadImage");
const authenticateToken = require("../../../shared/middleware/authToken");

const router = express.Router();

function configureRouter(characterController) {
  router.post(
    "/",
    authenticateToken,
    uploadImage,
    characterValidator,
    validatorHandler,
    characterController.create.bind(characterController)
  );

  router.get(
    "/",
    authenticateToken,
    characterController.getAll.bind(characterController)
  );

  router.get(
    "/:id",
    authenticateToken,
    characterController.getById.bind(characterController)
  );

  router.delete(
    "/:id",
    authenticateToken,
    characterController.delete.bind(characterController)
  );

  router.put(
    "/:id",
    authenticateToken,
    uploadImage,
    characterValidator,
    validatorHandler,
    characterController.edit.bind(characterController)
  );

  return router;
}

module.exports = configureRouter;
