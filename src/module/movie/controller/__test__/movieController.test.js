const chai = require("chai");

const { expect } = chai;
const sinon = require("sinon");

const MovieController = require("../movieController");

const createMovieTest = require("../../fixture/movieFixture");
const NotFoundError = require("../../../../shared/error/NotFoundError");

const mockMovieService = {
  save: sinon.stub(),
  getAll: sinon.stub(),
  delete: sinon.stub(),
  getById: sinon.stub(),
};

const movieController = new MovieController(mockMovieService);

const reqMock = {
  body: createMovieTest(),
  params: {
    id: 1,
  },
};
const resMock = {
  json: sinon.stub(),
  sendStatus: sinon.spy(),
  status: sinon.spy(() => resMock),
};
const nextMock = sinon.mock();

describe("Movie controller methods", () => {
  afterEach(() => {
    sinon.reset();
  });

  describe("create method", async () => {
    it("should call service's save method", async () => {
      const movie = createMovieTest();

      await movieController.create(reqMock, resMock, nextMock);

      expect(mockMovieService.save.calledOnceWith(movie)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(201)).to.be.true;
    });
  });

  describe("getAll method", async () => {
    it("should call service's getAll method and send movies as json", async () => {
      const movies = [createMovieTest(), createMovieTest()];
      mockMovieService.getAll.returns(movies);

      await movieController.getAll(reqMock, resMock, nextMock);

      expect(mockMovieService.getAll.calledOnce).to.be.true;
      expect(resMock.status.calledOnceWith(200)).to.be.true;
      expect(resMock.json.calledOnceWith(movies)).to.be.true;
    });
  });

  describe("getById method", async () => {
    it("should send a status 200 and a movie as json", async () => {
      const movie = createMovieTest();
      mockMovieService.getById.returns(movie);

      await movieController.getById(reqMock, resMock, nextMock);

      expect(resMock.status.calledOnceWith(200)).to.be.true;
      expect(resMock.json.calledOnceWith(movie)).to.be.true;
    });

    it("should send a status 401 when getById throws an error", async () => {
      mockMovieService.getById.onFirstCall().throws(new NotFoundError());

      await movieController.getById(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(401)).to.be.true;
    });
  });

  describe("delete method", async () => {
    it("should call service's delete method and send a status 200", async () => {
      await movieController.delete(reqMock, resMock, nextMock);

      expect(mockMovieService.delete.calledOnceWith(1)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(200)).to.be.true;
    });

    it("should send a status 401 when getById throws an error", async () => {
      mockMovieService.getById
        .onFirstCall()
        .throws(() => new NotFoundError());

      await movieController.delete(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(401)).to.be.true;
    });
  });

  describe("edit method", async () => {
    it("should call service's save method and send a status 200", async () => {
      const movie = createMovieTest();
      movie.id = 1;

      await movieController.edit(reqMock, resMock, nextMock);

      expect(mockMovieService.save.calledOnceWith(movie)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(200)).to.be.true;
    });

    it("should send a status 401 when getById throws an error", async () => {
      mockMovieService.getById
        .onFirstCall()
        .throws(() => new NotFoundError());

      await movieController.edit(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(401)).to.be.true;
    });
  });
});
