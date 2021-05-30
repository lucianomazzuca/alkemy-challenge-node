module.exports = class Genre {
  constructor({
    id,
    name,
    image,
    movies = []
  }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.movies = movies;
  }
}