const express = require("express");
const upload = require("../../../config/multer");

const router = express.Router();

function configureRouter(genreController) {
  router.post(
    "/",
    upload.single("image"),
    genreController.create.bind(genreController)
  );
  router.get("/", genreController.getAll.bind(genreController));
  router.get("/:id", genreController.getById.bind(genreController));
  router.delete("/:id", genreController.delete.bind(genreController));
  router.put(
    "/:id",
    upload.single("image"),
    genreController.edit.bind(genreController)
  );

  return router;
}

module.exports = configureRouter;
