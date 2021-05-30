const Genre = require("../entity/Genre");

function fromModelToEntity({ id, name, image, createdAt, updatedAt }) {
  return new Genre({
    id,
    name,
    image,
    createdAt,
    updatedAt,
  });
}

module.exports = { fromModelToEntity };
