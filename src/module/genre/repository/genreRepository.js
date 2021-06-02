const { fromModelToEntity } = require("../mapper/genreMapper");

module.exports = class GenreRepository {
  constructor(genreModel) {
    this.genreModel = genreModel;
  }

  async save(genre) {
    const newGenre = this.genreModel.build(genre, {
      isNewRecord: !genre.id,
    });

    await newGenre.save();

    return fromModelToEntity(newGenre);
  };

  async getAll() {
    const genres = await this.genreModel.findAll();

    return genres.map((genre) => fromModelToEntity(genre));
  }
}