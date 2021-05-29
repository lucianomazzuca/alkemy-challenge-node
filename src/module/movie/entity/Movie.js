/* eslint-disable camelcase */
module.exports = class Movie {
  constructor({ id, title, release_date, score, characters = [] }) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.score = score;
    this.characters = characters;
  }
}