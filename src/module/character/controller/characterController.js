module.exports = class CharacterController {
  constructor(characterService) {
    this.characterService = characterService;
  }

  async create(req, res, next) {
    const character = req.body;

    // Map image filename to character
    if (req.file) {
      character.image = req.file.filename;
    }

    try {
      await this.characterService.save(character);
    } catch (e) {
      next(e)
    }

    return res.sendStatus(201);
  }

  async getAll(req, res, next) {
    const params = req.query;
    try {
      const characters = await this.characterService.getAll(params);
      res.status(200).json(characters);
    } catch(e) {
      next(e);
    }
  };

  async getById(req, res, next) {
    try {
      const character = await this.characterService.getById(req.params.id);
      res.status(200).json(character);
    } catch(e) {
      next(e);
    }
  }
};
