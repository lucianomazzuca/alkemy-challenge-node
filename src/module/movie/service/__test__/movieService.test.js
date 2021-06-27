const chai = require("chai");
chai.use(require("chai-as-promised"));

const { expect } = chai;
const sinon = require("sinon");

const MovieService = require("../movieService");
const createMovieTest = require("../../fixture/movieFixture");

const mockMovieRepository = {
  save: sinon.stub(),
  getAll: sinon.stub(),
  delete: sinon.spy(),
  getById: sinon.spy(),
};

const movieService = new MovieService(mockMovieRepository);

describe("Movie Service methods", () => {
  describe("save method", () => {
    it("should call repository's save method", async () => {
      const movie = createMovieTest();

      await movieService.save(movie);

      expect(mockMovieRepository.save.calledOnceWith(movie)).to.be.true;
    });
  });

  describe("getAll method", () => {
    it("should call repository's getAll method and returns only names and images", async () => {
      const moviesMock = [createMovieTest(), createMovieTest()];
      mockMovieRepository.getAll.returns(moviesMock);

      const movies = await movieService.getAll();

      expect(mockMovieRepository.getAll.calledOnce).to.be.true;
      expect(movies[0]).to.have.all.keys("title", "release_date", "image");
    });
  });

  describe("delete method", () => {
    it("should call repository's delete method", async () => {
      await movieService.delete(1);

      expect(mockMovieRepository.delete.calledOnceWith(1)).to.be.true;
    });
  });

  describe("getById method", () => {
    it("should call repository's getById method", async () => {
      await movieService.getById(1);

      expect(mockMovieRepository.getById.calledOnceWith(1)).to.be.true;
    });
  });
});
