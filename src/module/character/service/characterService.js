module.exports = class CharacterService {
  constructor(characterRepository) {
    this.characterRepository = characterRepository;
  };

  async save(character) {
    return this.characterRepository.save(character);
  }

  async getAll() {
    const characters = await this.characterRepository.getAll();
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
  }
}