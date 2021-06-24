const chai = require("chai");

const { expect } = chai;
const sinon = require("sinon");

const CharacterController = require("../characterController");

const createCharacterTest = require("../../fixture/characterFixture");

const mockCharacterService = {
  save: sinon.stub(),
  getAll: sinon.stub(),
  delete: sinon.stub(),
  getById: sinon.stub(),
};

const characterController = new CharacterController(mockCharacterService);

const reqMock = {
  body: createCharacterTest(),
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

describe("Character controller methods", () => {
  afterEach(() => {
    sinon.reset();
  });

  describe("create method", async () => {
    it("should call service's save method", async () => {
      const character = createCharacterTest();

      await characterController.create(reqMock, resMock, nextMock);

      expect(mockCharacterService.save.calledOnceWith(character)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(201)).to.be.true;
    });
  });

  describe("getAll method", async () => {
    it("should call service's getAll method and send characters as json", async () => {
      const characters = [createCharacterTest(), createCharacterTest()];
      mockCharacterService.getAll.returns(characters);

      await characterController.getAll(reqMock, resMock, nextMock);

      expect(mockCharacterService.getAll.calledOnce).to.be.true;
      expect(resMock.status.calledOnceWith(200)).to.be.true;
      expect(resMock.json.calledOnceWith(characters)).to.be.true;
    });
  });

  describe("getById method", async () => {
    it("should send a status 200 and a character as json", async () => {
      const character = createCharacterTest();
      mockCharacterService.getById.returns(character);

      await characterController.getById(reqMock, resMock, nextMock);

      expect(resMock.status.calledOnceWith(200)).to.be.true;
      expect(resMock.json.calledOnceWith(character)).to.be.true;
    });

    it("should send a status 404 when the character is not found", async () => {
      mockCharacterService.getById.onFirstCall().returns(null);

      await characterController.getById(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(404)).to.be.true;
    });
  });

  describe("delete method", async () => {
    it("should call service's delete method and send a status 200", async () => {
      const character = createCharacterTest();
      character.id = 1;
      mockCharacterService.getById.onFirstCall().returns(character);

      await characterController.delete(reqMock, resMock, nextMock);

      expect(mockCharacterService.delete.calledOnceWith(1)).to.be.true;
      expect(resMock.sendStatus.calledOnceWith(200)).to.be.true;
    });

    it("should send a status 404 when getById returns null", async () => {
      mockCharacterService.getById.onFirstCall().returns(null);

      await characterController.delete(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(404)).to.be.true;
    });
  });

  describe("edit method", async () => {
    it("should call service's save method and send a status 200", async () => {
      const character = createCharacterTest();
      character.id = 1;
      mockCharacterService.getById.onFirstCall().returns(character);

      await characterController.edit(reqMock, resMock, nextMock);

      expect(mockCharacterService.save.calledOnceWith(character)).to.be.true;
      expect(mockCharacterService.getById.calledOnceWith(character.id)).to.be
        .true;
      expect(resMock.sendStatus.calledOnceWith(200)).to.be.true;
    });

    it("should send a status 404 when getById returns null", async () => {
      mockCharacterService.getById
        .onFirstCall()
        .returns(null)

      await characterController.edit(reqMock, resMock, nextMock);
      expect(resMock.status.calledOnceWith(404)).to.be.true;
    });
  });
});
