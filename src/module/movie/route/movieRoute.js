const express = require("express");
const uploadImage = require("../../../shared/middleware/uploadImage");

const router = express.Router();

function configureRouter(movieController) {
  router.post("/", uploadImage, movieController.create.bind(movieController));
  router.get("/", movieController.getAll.bind(movieController));
  router.get("/:id", movieController.getById.bind(movieController));
  router.delete("/:id", movieController.delete.bind(movieController));
  router.put("/:id", uploadImage, movieController.edit.bind(movieController));

  return router;
}

module.exports = configureRouter;
