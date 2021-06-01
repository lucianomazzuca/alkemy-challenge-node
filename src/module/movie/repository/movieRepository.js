const { fromModelToEntity } = require("../mapper/movieMapper");

module.exports = class MovieRepository {
  constructor(movieModel) {
    this.movieModel = movieModel;
  }

  async save(movie, charactersId = []) {
    const movieModel = this.movieModel.build(movie, {
      isNewRecord: !movie.id,
    });

    charactersId.map(async (id) => {
      await movieModel.addCharacter(id);
    })

    await movieModel.save();

    return fromModelToEntity(movieModel);
  }

  async getAll() {
    const movies = await this.movieModel.findAll();

    return movies.map((movie) => fromModelToEntity(movie));
  }

  async delete(id) {
    return Boolean(await this.movieModel.destroy({ where: { id } }));
  }
};
