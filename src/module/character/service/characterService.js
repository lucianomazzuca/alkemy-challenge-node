module.exports = class CharacterService {
  constructor(characterRepository) {
    this.characterRepository = characterRepository;
  };

  async save(character) {
    return this.characterRepository.save(character);
  }

  async getAll() {
    return this.characterRepository.getAll();
  }
}