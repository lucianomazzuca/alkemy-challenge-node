const { fromModelToEntity } = require("../mapper/characterMapper");

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

  async getAll(params) {
    const characters = await this.characterModel.findAll({
      include: { model: this.movieModel, as: "movies" },
      where: params,
    });

    return characters.map((character) => fromModelToEntity(character));
  }

  async getById(id) {
    const character = await this.characterModel.findByPk(id, {
      include: { model: this.movieModel, as: "movies" },
    });

    if (!character) {
      return null;
    }

    return fromModelToEntity(character);
  }

  async delete(id) {
    return Boolean(await this.characterModel.destroy({ where: { id } }));
  }
};
