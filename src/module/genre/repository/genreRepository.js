module.exports = class GenreRepository {
  constructor(genreModel) {
    this.genreModel = genreModel;
  }

  async save(genre) {
    const newGenre = this.genreModel.build(genre, {
      isNewRecord: !genre.id,
    });

    await newGenre.save();

    return newGenre;
  }
}