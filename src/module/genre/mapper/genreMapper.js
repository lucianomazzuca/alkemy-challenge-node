const Genre = require("../entity/Genre");

function fromModelToEntity({ id, name, image, createdAt, updatedAt, movies = [] }) {
  return new Genre({
    id,
    name,
    image,
    createdAt,
    updatedAt,
    movies
  });
}

module.exports = { fromModelToEntity };
