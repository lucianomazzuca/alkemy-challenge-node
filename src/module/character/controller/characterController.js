module.exports = class CharacterController {
  constructor(characterService) {
    this.characterService = characterService;
  }

  async create(req, res, next) {
    const character = req.body;

    // Map image filename to character
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

  async getAll(req, res, next) {
    try {
      const characters = await this.characterService.getAll();
      res.status(200).json(characters);
    } catch(e) {
      console.log(e)
      next(e);
    }
  }
};
