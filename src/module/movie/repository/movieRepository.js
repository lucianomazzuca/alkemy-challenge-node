const { Op } = require("sequelize");
const NotFoundError = require("../../../shared/error/NotFoundError");
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

  async getAll(queryOpt) {
    const where = {};

    if (queryOpt && queryOpt.title) {
      where.title = { [Op.iLike]: `%${queryOpt.title}%` };
    }

    if (queryOpt && queryOpt.genre) {
      where["$genre.id$"] = { [Op.eq]: queryOpt.genre };
    }

    const movies = await this.movieModel.findAll({
      include: [
        { model: this.characterModel, as: "characters" },
        { model: this.genreModel, as: "genres" },
      ],
      where
    });

    return movies.map((movie) => fromModelToEntity(movie));
  }

  async getById(id) {
    const movie = await this.movieModel.findByPk(id, {
      include: [
        { model: this.characterModel, as: "characters" },
        { model: this.genreModel, as: "genres" },
      ],
    });

    if (!movie) {
      throw new NotFoundError(`Movie with id ${id} was not found`);
    }

    return fromModelToEntity(movie);
  }

  async delete(id) {
    return Boolean(await this.movieModel.destroy({ where: { id } }));
  }
};
