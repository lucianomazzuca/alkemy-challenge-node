const chai = require("chai");
chai.use(require("chai-as-promised"));

const { expect } = chai;
const sinon = require("sinon");

const CharacterService = require("../characterService");
const createCharacterTest = require("../../fixture/characterFixture");

const mockCharacterRepository = {
  save: sinon.stub(),
  getAll: sinon.spy(),
};

const characterService = new CharacterService(mockCharacterRepository);

describe("Character Service methods", () => {
  describe("save method", () => {
    it("should call repository's save method", async () => {
      const character = createCharacterTest();

      await characterService.save(character);

      expect(mockCharacterRepository.save.calledOnceWith(character)).to.be.true;
    });
  });

  describe("getAll method", () => {
    it("should call repository's getAll method", async () => {
      await characterService.getAll();

      expect(mockCharacterRepository.getAll.calledOnce).to.be.true;
    });
  });
});
