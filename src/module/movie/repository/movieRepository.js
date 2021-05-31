const { fromModelToEntity } = require("../mapper/moveMapper");

module.exports = class MovieRepository {
  constructor(movieModel) {
    this.movieModel = movieModel;
  }

  async save(movie) {
    const newMovie = this.movieModel.build(movie, {
      isNewRecord: !movie.id,
    });

    await newMovie.save();

    return fromModelToEntity(newMovie);
  }

  async getAll() {
    const movies = await this.movieModel.findAll();

    return movies.map((movie) => fromModelToEntity(movie));
  }

  async delete(id) {
    return Boolean(await this.movieModel.destroy({ where: { id } }));
  }
};
