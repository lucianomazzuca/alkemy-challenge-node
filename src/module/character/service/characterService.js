module.exports = class CharacterService {
  constructor(characterRepository) {
    this.characterRepository = characterRepository;
  }

  async save(character) {
    return this.characterRepository.save(character);
  }

  async getAll(params) {
    const characters = await this.characterRepository.getAll(params);
    const charactersNameAndImage = characters.map((character) => ({
      name: character.name,
      image: character.image,
    }));

    return charactersNameAndImage;
  }

  async delete(id) {
    return this.characterRepository.delete(id);
  }

  async getById(id) {
    return this.characterRepository.getById(id);
  }

  async validateCharacters(charactersId) {
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for(const id of charactersId) {
      // eslint-disable-next-line no-await-in-loop
      const character = await this.getById(id);
      if (!character) {
        errors.push(`Character with id ${id} doesn't exist`)
      }
    }

    return errors;
  }
};
