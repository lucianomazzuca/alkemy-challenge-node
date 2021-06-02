const { fromModelToEntity } = require("../mapper/movieMapper");

module.exports = class MovieRepository {
  constructor(movieModel, characterModel, genreModel) {
    this.movieModel = movieModel;
    this.characterModel = characterModel;
    this.genreModel = genreModel;
  }

  async save(movie, charactersId = [], genresId = []) {
    const movieModel = this.movieModel.build(movie, {
      isNewRecord: !movie.id,
    });

    await movieModel.save();
    await movieModel.setCharacters(charactersId);
    await movieModel.setGenres(genresId);

    return fromModelToEntity(movieModel);
  }

  async getAll() {
    const movies = await this.movieModel.findAll();

    return movies.map((movie) => fromModelToEntity(movie));
  }

  async getById(id) {
    const movie = await this.movieModel.findByPk(id, {
      include: [
        { model: this.characterModel, as: "characters" },
        { model: this.genreModel, as: "genres" },
      ],
    });

    return fromModelToEntity(movie);
  }

  async delete(id) {
    return Boolean(await this.movieModel.destroy({ where: { id } }));
  }
};
