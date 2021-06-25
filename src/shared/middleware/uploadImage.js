const upload = require('./multer');
const FileFormatError = require("../error/FileFormatError");

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof FileFormatError) {
      return res.status(400).json(err.message);
    }
    return next(err);
  });
};