const { fromModelToEntity } = require("../mapper/characterMapper");
const NotFoundError = require("../../../shared/error/NotFoundError");

module.exports = class CharacterRepository {
  constructor(characterModel, movieModel) {
    this.characterModel = characterModel;
    this.movieModel = movieModel;
  }

  async save(character) {
    const newCharacter = this.characterModel.build(character, {
      isNewRecord: !character.id,
    });

    await newCharacter.save();

    return fromModelToEntity(newCharacter);
  }
};
