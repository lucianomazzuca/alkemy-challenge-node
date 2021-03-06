/* eslint-disable */
const multer = require("multer");
const path = require("path");
const FileFormatError = require("../error/FileFormatError");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./public/upload`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new FileFormatError("Only .png, .jpg and .jpeg format allowed")
      );
    }
  },
}).single("image");

module.exports = upload;
