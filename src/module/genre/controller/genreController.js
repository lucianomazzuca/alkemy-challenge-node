const NotFoundError = require("../../../shared/error/NotFoundError");

module.exports = class GenreController {
  constructor(genreService) {
    this.genreService = genreService;
  }

  async create(req, res, next) {
    // Map image filename to genre
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const genre = req.body;

    try {
      await this.genreService.save(genre);
    } catch (e) {
      next(e);
    }

    return res.sendStatus(201);
  }

  async getAll(req, res, next) {
    const params = req.query;
    try {
      const genres = await this.genreService.getAll(params);
      res.status(200).json(genres);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const genre = await this.genreService.getById(req.params.id);
      if (!genre) {
        return res
          .status(404)
          .json(`Genre with id ${req.params.id} was not found`);
      }

      return res.status(200).json(genre);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      // check if genre exists
      const genreExists = await this.genreService.getById(req.params.id);
      if (!genreExists) {
        return res
          .status(404)
          .json(`Genre with id ${req.params.id} was not found`);
      }

      await this.genreService.delete(req.params.id);
      return res.sendStatus(200);
    } catch (e) {
      return next(e);
    }
  }

  async edit(req, res, next) {
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const genre = req.body;
    genre.id = req.params.id;

    try {
      // check if genre exists
      await this.genreService.getById(req.params.id);

      await this.genreService.save(genre);
      return res.sendStatus(200);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(401).json({ error: e.message });
      }
      return next(e);
    }
  }
};
