module.exports = class MovieService {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async save(movie, charactersId, genresId) {
    
    return this.movieRepository.save(movie, charactersId, genresId);
  }

  async getAll(params) {
    const movies = await this.movieRepository.getAll(params);
    const moviesNameAndImage = movies.map((movie) => ({
      title: movie.title,
      release_date: movie.release_date,
      image: movie.image,
    }));

    return moviesNameAndImage;
  }

  async delete(id) {
    return this.movieRepository.delete(id);
  }

  async getById(id) {
    return this.movieRepository.getById(id);
  }
};
