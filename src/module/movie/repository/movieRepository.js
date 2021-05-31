module.exports = class MovieRepository {
  constructor(movieModel) {
    this.movieModel = movieModel;
  }

  async save(movie){
    const newMovie = this.movieModel.build(movie, {
      isNewRecord: !movie.id,
    });

    await newMovie.save();

    return newMovie;
  }
}