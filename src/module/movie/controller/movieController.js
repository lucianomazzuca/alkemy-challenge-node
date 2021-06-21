const NotFoundError = require("../../../shared/error/NotFoundError");

module.exports = class MovieController {
  constructor(movieService) {
    this.movieService = movieService;
  }

  async create(req, res, next) {
    // Map image filename to movie
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const movie = req.body;

    try {
      await this.movieService.save(movie);
    } catch (e) {
      next(e);
    }

    return res.sendStatus(201);
  }

  async getAll(req, res, next) {
    const params = req.query;
    try {
      const movies = await this.movieService.getAll(params);
      res.status(200).json(movies);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const movie = await this.movieService.getById(req.params.id);
      return res.status(200).json(movie);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(401).json({ error: e.message });
      }
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      // check if movie exists
      await this.movieService.getById(req.params.id);

      await this.movieService.delete(req.params.id);
      return res.sendStatus(200);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(401).json({ error: e.message });
      }
      return next(e);
    }
  }

  async edit(req, res, next) {
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const movie = req.body;
    movie.id = req.params.id;

    try {
      // check if movie exists
      await this.movieService.getById(req.params.id);

      await this.movieService.save(movie);
      return res.sendStatus(200);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(401).json({ error: e.message });
      }
      return next(e);
    }
  }
};
