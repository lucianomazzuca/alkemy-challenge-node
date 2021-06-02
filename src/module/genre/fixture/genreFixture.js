const Genre = require('../entity/Genre');

module.exports = function createTestGenre(id) {
  return new Genre({
    id,
    name: 'Action',
    image: 'Test',
    movies: undefined
  })
}