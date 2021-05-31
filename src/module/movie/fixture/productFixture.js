const Movie = require('../entity/Movie');

module.exports = function createTestMovie(id) {
  return new Movie(
    {
      id,
      title: 'Memento',
      release_date: 2000,
      score: 5,
      image: 'test'
    }
  )
}