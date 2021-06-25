const { Op } = require("sequelize");
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

  async getAll(queryOpt) {
    const where = {};

    if (queryOpt && queryOpt.name) {
      where.name = { [Op.eq]: queryOpt.name };
    }

    if (queryOpt && queryOpt.age) {
      where.age = { [Op.eq]: queryOpt.age };
    }

    if (queryOpt && queryOpt.weight) {
      where.weight = { [Op.eq]: queryOpt.weight };
    }

    if (queryOpt && queryOpt.movies) {
      where["$movies.id$"] = { [Op.eq]: queryOpt.movies };
    }

    const characters = await this.characterModel.findAll({
      include: { model: this.movieModel, as: "movies" },
      where,
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
