module.exports = class CharacterController {
  constructor(characterService) {
    this.characterService = characterService;
  }

  async index(req, res) {
    res.send('hello')
  }
}