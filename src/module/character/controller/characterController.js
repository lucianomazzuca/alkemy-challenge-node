module.exports = class CharacterController {
  constructor(characterService) {
    this.characterService = characterService;
  }

  async create(req, res) {
    const character = req.body;

    res.send(character)
  }
}