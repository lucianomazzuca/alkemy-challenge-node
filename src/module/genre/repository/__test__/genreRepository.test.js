const { expect } = require("chai");

const { Sequelize } = require("sequelize");

const GenreModel = require("../../model/genreModel");
const GenreRepository = require("../genreRepository");

describe("Genre repository methods", () => {
  let genreRepository;
  let genreModel;

  beforeEach(async () => {
    // Setup DB in memory
    const sequelizeInstance = new Sequelize("sqlite::memory", {
      logging: false,
    });

    // Setup Models
    genreModel = GenreModel.setup(sequelizeInstance);

    // Instantiate repository
    genreRepository = new GenreRepository(genreModel);

    await sequelizeInstance.sync({ force: true });
  });

  describe("Save method", () => {
    it("should add a new genre to the db", async () => {
      const genre = {
        id: undefined,
        name: "Action",
        image: "test",
      };

      await genreRepository.save(genre);

      const savedGenre = await genreModel.findByPk(1);
      expect(savedGenre.id).to.equal(1);
      expect(savedGenre.name).to.equal("Action");
    });

    it("should update an existing genre in the db", async () => {
      const genre = {
        id: undefined,
        name: "Action",
        image: "test",
      };

      await genreRepository.save(genre);

      const updatedGenre = {
        id: 1,
        name: "Adventure",
        image: "test",
      };

      await genreRepository.save(updatedGenre);

      const savedGenre = await genreModel.findByPk(1);
      expect(savedGenre.id).to.equal(1);
      expect(savedGenre.name).to.equal("Adventure");
    });
  });
});
