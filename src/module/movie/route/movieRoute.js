const express = require("express");
const upload = require("../../../config/multer");

const router = express.Router();

function configureRouter(movieController) {
  router.post(
    "/",
    upload.single("image"),
    movieController.create.bind(movieController)
  );
  router.get("/", movieController.getAll.bind(movieController));
  router.get("/:id", movieController.getById.bind(movieController));
  router.delete("/:id", movieController.delete.bind(movieController));
  router.put(
    "/:id",
    upload.single("image"),
    movieController.edit.bind(movieController)
  );

  return router;
}

module.exports = configureRouter;
