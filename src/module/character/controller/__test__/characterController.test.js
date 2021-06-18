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
});
