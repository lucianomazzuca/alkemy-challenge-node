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
  getById: sinon.stub(),
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
      const charactersMock = [createCharacterTest(), createCharacterTest()];
      mockCharacterRepository.getAll.returns(charactersMock);

      const characters = await characterService.getAll();

      expect(mockCharacterRepository.getAll.calledOnce).to.be.true;
      expect(characters[0]).to.have.all.keys("name", "image");
    });
  });

  describe("delete method", () => {
    it("should call repository's delete method", async () => {
      await characterService.delete(1);

      expect(mockCharacterRepository.delete.calledOnceWith(1)).to.be.true;
    });
  });

  describe("getById method", () => {
    it("should call repository's getById method", async () => {
      await characterService.getById(1);

      expect(mockCharacterRepository.getById.calledOnceWith(1)).to.be.true;
    });
  });

  describe("validateCharacters method", () => {
    it("should call getById method and return an empty array", async () => {
      const character = createCharacterTest();
      mockCharacterRepository.getById.returns(character);

      const result = await characterService.validateCharacters([1, 2, 3]);
      expect(result).to.be.an("array").and.have.lengthOf(0);
    });

    it("should return an array with error messages when character doesn't exist", async () => {
      mockCharacterRepository.getById.returns(null);

      const result = await characterService.validateCharacters([1, 2]);
      expect(result).to.be.an("array").and.have.lengthOf(2);
      expect(result[0]).to.equal("Character with id 1 doesn't exist");
      expect(result[1]).to.equal("Character with id 2 doesn't exist");
    });
  });
});
