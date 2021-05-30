const { assert } = require("assert");
const { expect } = require("chai");
const { Sequelize } = require("sequelize");

const MovieModel = require('../../../movie/model/movieModel');
const GenreModel = require("../../model/genreModel");
const MovieGenreModel = require('../../../movie/model/movieGenreModel');
const GenreRepository = require("../genreRepository");

describe("Genre repository methods", () => {
  beforeEach(async () => {
    // Setup DB in memory
    const sequelizeInstance = new Sequelize("sqlite::memory", { logging: false });

    // Setup Models
    const genreModel = GenreModel.setup(sequelizeInstance);

    // Instantiate repository
    const genreRepository = new GenreRepository(genreModel);

    await sequelizeInstance.sync({ force: true });

  });

  it("save should create a new genre", async () => {});
});
