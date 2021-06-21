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
};
