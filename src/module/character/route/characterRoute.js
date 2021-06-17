const express = require("express");
const upload = require("../../../config/multer");

const router = express.Router();

function configureRouter(characterController) {
  router.post(
    "/",
    upload.single("image"),
    characterController.create.bind(characterController)
  );
  router.get("/", characterController.getAll.bind(characterController));
  router.get("/:id", characterController.getById.bind(characterController));

  return router;
}

module.exports = configureRouter;
