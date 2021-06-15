module.exports = class CharacterController {
  constructor(characterService) {
    this.characterService = characterService;
  }

  async create(req, res, next) {
    const character = req.body;

    if (req.file) {
      req.body.image = req.file.filename;
    }

    try {
      await this.characterService.save(character);
    } catch (e) {
      next(e)
    }

    return res.sendStatus(201);
  }
};
