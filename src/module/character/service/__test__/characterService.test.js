const chai = require("chai");
chai.use(require("chai-as-promised"));

const { expect } = chai;
const sinon = require("sinon");

const CharacterService = require("../characterService");
const createCharacterTest = require("../../fixture/characterFixture");

const mockCharacterRepository = {
  save: sinon.stub(),
  getAll: sinon.stub(),
  delete: sinon.spy(),
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
    it("should call repository's getAll method and returns only names and images", async () => {
      const charactersMock = [
        createCharacterTest(),
        createCharacterTest(),
      ]
      mockCharacterRepository.getAll.returns(charactersMock)

      const characters = await characterService.getAll();

      expect(mockCharacterRepository.getAll.calledOnce).to.be.true;
      expect(characters[0]).to.have.all.keys('name', 'image');
    });
  });

  describe("delete method", () => {
    it("should call repository's delete method", async () => {
      await characterService.delete(1);

      expect(mockCharacterRepository.delete.calledOnceWith(1)).to.be.true;
    })
  })
});
