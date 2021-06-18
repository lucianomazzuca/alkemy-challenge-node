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
  router.delete("/:id", characterController.delete.bind(characterController));
  router.put("/:id", upload.single("image"), characterController.edit.bind(characterController));

  return router;
}

module.exports = configureRouter;
