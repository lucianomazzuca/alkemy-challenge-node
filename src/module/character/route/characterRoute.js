const express = require("express");
const upload = require('../../../config/multer');

const router = express.Router();

function configureRouter(characterController) {
  router.post(
    "/",
    upload.single('image'),
    characterController.create.bind(characterController)
  );

  return router;
}

module.exports = configureRouter;
