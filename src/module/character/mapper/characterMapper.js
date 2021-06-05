const Character = require("../entity/Character");

function fromModelToEntity({
  id,
  name,
  age,
  weight,
  story,
  image,
  movies = [],
}) {
  return new Character({
    id,
    name,
    age,
    weight,
    story,
    image,
    movies,
  });
}

module.exports = { fromModelToEntity };
