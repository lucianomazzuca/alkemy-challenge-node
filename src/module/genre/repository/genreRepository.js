const { fromModelToEntity } = require("../mapper/genreMapper");
const NotFoundError = require('../../../shared/error/NotFoundError')

module.exports = class GenreRepository {
  constructor(genreModel, movieModel) {
    this.genreModel = genreModel;
    this.movieModel = movieModel;
  }

  async save(genre) {
    const newGenre = this.genreModel.build(genre, {
      isNewRecord: !genre.id,
    });

    await newGenre.save();

    return fromModelToEntity(newGenre);
  }

  async getAll() {
    const genres = await this.genreModel.findAll({
      include: { model: this.movieModel, as: "movies" },
    });

    return genres.map((genre) => fromModelToEntity(genre));
  }

  async getById(id) {
    const genre = await this.genreModel.findByPk(id, {
      include: { model: this.movieModel, as: "movies" },
    });

    if (!genre) {
      return null;
    }
    
    return fromModelToEntity(genre);
  }

  async delete(id) {
    return Boolean(await this.genreModel.destroy({ where: { id } }));
  }
};
