const chai = require("chai");

const { expect } = chai;
const sinon = require("sinon");

const GenreController = require("../genreController");

const createGenreTest = require("../../fixture/genreFixture");
const NotFoundError = require("../../../../shared/error/NotFoundError");

const mockGenreService = {
  save: sinon.stub(),
  getAll: sinon.stub(),
  delete: sinon.stub(),
  getById: sinon.stub(),
};

const genreController = new GenreController(mockGenreService);

const reqMock = {
  body: createGenreTest(),
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

describe("Genre controller methods", () => {
  afterEach(() => {
    sinon.reset();
  });

  describe("create method", async () => {
    it("should call service's save method", async () => {
      const genre = createGenreTest();

      await genreController.create(reqMock, resMock, nextMock);

      expect(mockGenreService.save.calledOnceWith(genre)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(201)).to.be.true;
    });
  });

  describe("getAll method", async () => {
    it("should call service's getAll method and send genres as json", async () => {
      const genres = [createGenreTest(), createGenreTest()];
      mockGenreService.getAll.returns(genres);

      await genreController.getAll(reqMock, resMock, nextMock);

      expect(mockGenreService.getAll.calledOnce).to.be.true;
      expect(resMock.status.calledOnceWith(200)).to.be.true;
      expect(resMock.json.calledOnceWith(genres)).to.be.true;
    });
  });

  describe("getById method", async () => {
    it("should send a status 200 and a genre as json", async () => {
      const genre = createGenreTest();
      mockGenreService.getById.returns(genre);

      await genreController.getById(reqMock, resMock, nextMock);

      expect(resMock.status.calledOnceWith(200)).to.be.true;
      expect(resMock.json.calledOnceWith(genre)).to.be.true;
    });

    it("should send a status 401 when getById throws an error", async () => {
      mockGenreService.getById.onFirstCall().returns(null);

      await genreController.getById(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(404)).to.be.true;
    });
  });

  describe("delete method", async () => {
    it("should call service's delete method and send a status 200", async () => {
      const genre = createGenreTest(1);
      mockGenreService.getById.onFirstCall().returns(genre);

      await genreController.delete(reqMock, resMock, nextMock);

      expect(mockGenreService.delete.calledOnceWith(1)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(200)).to.be.true;
    });

    it("should send a status 401 when getById throws an error", async () => {
      mockGenreService.getById.onFirstCall().returns(null);

      await genreController.delete(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(404)).to.be.true;
    });
  });

  describe("edit method", async () => {
    it("should call service's save method and send a status 200", async () => {
      const genre = createGenreTest();
      genre.id = 1;

      await genreController.edit(reqMock, resMock, nextMock);

      expect(mockGenreService.save.calledOnceWith(genre)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(200)).to.be.true;
    });

    it("should send a status 401 when getById throws an error", async () => {
      mockGenreService.getById.onFirstCall().throws(() => new NotFoundError());

      await genreController.edit(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(401)).to.be.true;
    });
  });
});
