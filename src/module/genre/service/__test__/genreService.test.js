const chai = require("chai");
chai.use(require("chai-as-promised"));

const { expect } = chai;
const sinon = require("sinon");

const GenreService = require("../genreService");
const createGenreTest = require("../../fixture/genreFixture");

const mockGenreRepository = {
  save: sinon.stub(),
  getAll: sinon.stub(),
  delete: sinon.spy(),
  getById: sinon.stub(),
};

const genreService = new GenreService(mockGenreRepository);

describe("Genre Service methods", () => {
  describe("save method", () => {
    it("should call repository's save method", async () => {
      const genre = createGenreTest();

      await genreService.save(genre);

      expect(mockGenreRepository.save.calledOnceWith(genre)).to.be.true;
    });
  });

  describe("getAll method", () => {
    it("should call repository's getAll method and returns only names and images", async () => {
      const genresMock = [createGenreTest(), createGenreTest()];
      mockGenreRepository.getAll.returns(genresMock);

      const genres = await genreService.getAll();

      expect(mockGenreRepository.getAll.calledOnce).to.be.true;
      expect(genres[0]).to.have.all.keys("name", "image");
    });
  });

  describe("delete method", () => {
    it("should call repository's delete method", async () => {
      await genreService.delete(1);

      expect(mockGenreRepository.delete.calledOnceWith(1)).to.be.true;
    });
  });

  describe("getById method", () => {
    it("should call repository's getById method", async () => {
      await genreService.getById(1);

      expect(mockGenreRepository.getById.calledOnceWith(1)).to.be.true;
    });
  });

  describe("validateGenres method", () => {
    it("should call getById method and return an empty array", async () => {
      const genre = createGenreTest();
      mockGenreRepository.getById.returns(genre);

      const result = await genreService.validateGenres([1, 2, 3]);
      expect(result).to.be.an("array").and.have.lengthOf(0);
    });

    it("should return an array with error messages when genre doesn't exist", async () => {
      mockGenreRepository.getById.returns(null);

      const result = await genreService.validateGenres([1, 2]);
      expect(result).to.be.an("array").and.have.lengthOf(2);
      expect(result[0]).to.equal("Genre with id 1 doesn't exist");
      expect(result[1]).to.equal("Genre with id 2 doesn't exist");
    });
  });
});
