module.exports = class GenreService {
  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async save(genre) {
    return this.genreRepository.save(genre);
  }

  async getAll(params) {
    const genres = await this.genreRepository.getAll(params);
    const genresNameAndImage = genres.map((genre) => ({
      name: genre.name,
      image: genre.image,
    }));

    return genresNameAndImage;
  }

  async delete(id) {
    return this.genreRepository.delete(id);
  }

  async getById(id) {
    return this.genreRepository.getById(id);
  }

  async validateGenres(genresId) {
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const id of genresId) {
      // eslint-disable-next-line no-await-in-loop
      const genre = await this.getById(id);
      if (!genre) {
        errors.push(`Genre with id ${id} doesn't exist`);
      }
    }

    return errors;
  }
};
