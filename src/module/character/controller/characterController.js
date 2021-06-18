const NotFoundError = require("../../../shared/error/NotFoundError");

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
      next(e);
    }

    return res.sendStatus(201);
  }

  async getAll(req, res, next) {
    const params = req.query;
    try {
      const characters = await this.characterService.getAll(params);
      res.status(200).json(characters);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const character = await this.characterService.getById(req.params.id);
      return res.status(200).json(character);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(401).json({ error: e.message });
      }
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      // check if character exists
      await this.characterService.getById(req.params.id);

      await this.characterService.delete(req.params.id);
      return res.sendStatus(200);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(401).json({ error: e.message });
      }
      return next(e);
    }
  }
};
