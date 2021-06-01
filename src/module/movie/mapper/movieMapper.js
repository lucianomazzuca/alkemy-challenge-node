/* eslint-disable camelcase */
const Movie = require("../entity/Movie");

function fromModelToEntity({
  id,
  title,
  release_date,
  score,
  image,
  characters,
}) {
  return new Movie({ id, title, release_date, score, image, characters });
}

module.exports = { fromModelToEntity };
