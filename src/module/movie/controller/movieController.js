const NotFoundError = require("../../../shared/error/NotFoundError");

module.exports = class MovieController {
  constructor(movieService, genreService, characterService) {
    this.movieService = movieService;
    this.genreService = genreService;
    this.characterService = characterService;
  }

  async create(req, res, next) {
    // Map image filename to movie
    if (req.file) {
      req.body.image = req.file.filename;
    }

    let errors = [];

    let charactersId = [];
    if (req.body.characters) {
      charactersId = JSON.parse(req.body.characters);
      const characterErrors = await this.characterService.validateCharacters(
        charactersId
      );
      errors = errors.concat(characterErrors);
    }

    let genresId = [];
    if (req.body.genres) {
      genresId = JSON.parse(req.body.genres);
      const genresErrors = await this.genreService.validateGenres(genresId);
      errors = errors.concat(genresErrors);
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    const movie = req.body;

    try {
      await this.movieService.save(movie, charactersId, genresId);
    } catch (e) {
      next(e);
    }

    return res.sendStatus(201);
  }

  async getAll(req, res, next) {
    try {
      const movies = await this.movieService.getAll(req.query);
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

    let errors = [];
    
    let charactersId = [];
    if (req.body.characters) {
      charactersId = JSON.parse(req.body.characters);
      const characterErrors = await this.characterService.validateCharacters(charactersId);
      errors = errors.concat(characterErrors);
    }

    let genresId = [];
    if (req.body.genres) {
      genresId = JSON.parse(req.body.genres);
      const genresErrors = await this.genreService.validateGenres(genresId);
      errors = errors.concat(genresErrors);
    }

    if (errors.length > 0) {
      return res.status(400).json({errors});
    }

    const movie = req.body;
    movie.id = req.params.id;

    try {
      // check if movie exists
      await this.movieService.getById(req.params.id);

      await this.movieService.save(movie, charactersId, genresId);
      return res.sendStatus(200);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(401).json({ error: e.message });
      }
      return next(e);
    }
  }
};
