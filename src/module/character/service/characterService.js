module.exports = class CharacterService {
  constructor(characterRepository) {
    this.characterRepository = characterRepository;
  };

  async save(character) {
    return this.characterRepository.save(character);
  }

  async getAll(params) {
    const characters = await this.characterRepository.getAll(params);
    const charactersNameAndImage = characters.map(character => (
      {
        name: character.name,
        image: character.image
      }
    ))

    return charactersNameAndImage;
  }

  async delete(id) {
    return this.characterRepository.delete(id);
  };

  async getById(id) {
    return this.characterRepository.getById(id);
  }
}