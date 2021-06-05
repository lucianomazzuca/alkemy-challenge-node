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

  async getAll() {
    const characters = await this.characterModel.findAll({
      include: { model: this.movieModel, as: "movies" },
    });

    return characters.map((character) => fromModelToEntity(character));
  }

  async getById(id) {
    const character = await this.characterModel.findByPk(id, {
      include: { model: this.movieModel, as: "movies" },
    });

    if (!character) {
      throw new NotFoundError(`Character with id ${id} was not found`);
    }

    return fromModelToEntity(character);
  }

  async delete(id) {
    return Boolean(await this.characterModel.destroy({ where: { id } }));
  }
};
