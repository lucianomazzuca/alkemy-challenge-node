module.exports = class CharacterController {
  constructor(characterService) {
    this.characterService = characterService;
  }

  async create(req, res, next) {
    // Map image filename to character
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const character = req.body;

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
      if (!character) {
        return res
          .status(404)
          .json(`Character with id ${req.params.id} was not found`);
      }

      return res.status(200).json(character);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req, res, next) {
    
    try {
      // check if character exists
      const characterExists = await this.characterService.getById(req.params.id);
      if (!characterExists) {
        return res
          .status(404)
          .json(`Character with id ${req.params.id} was not found`);
      }

      await this.characterService.delete(req.params.id);
      return res.sendStatus(200);
    } catch (e) {
      return next(e);
    }
  }

  async edit(req, res, next) {
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const character = req.body;
    character.id = req.params.id;

    try {
      // check if character exists
      const characterExists = await this.characterService.getById(
        req.params.id
      );
      if (!characterExists) {
        return res
          .status(404)
          .json(`Character with id ${req.params.id} was not found`);
      }

      await this.characterService.save(character);
      return res.sendStatus(200);
    } catch (e) {
      return next(e);
    }
  }
};
