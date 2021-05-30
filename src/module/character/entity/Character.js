module.exports = class Character {
  constructor({
    id,
    name,
    age,
    weight,
    story,
    movies = []
  }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.weight = weight;
    this.story = story;
    this.movies = movies
  }
}
