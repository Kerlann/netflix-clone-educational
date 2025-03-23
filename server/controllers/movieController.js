const Movie = require('../models/Movie');

/**
 * @desc    Récupérer tous les films
 * @route   GET /api/movies
 * @access  Public
 */
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Récupérer un film par ID
 * @route   GET /api/movies/:id
 * @access  Public
 */
exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Film non trouvé'
      });
    }
    
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Récupérer les films tendance
 * @route   GET /api/movies/trending
 * @access  Public
 */
exports.getTrendingMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ isTrending: true });
    
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Récupérer les films les mieux notés
 * @route   GET /api/movies/top-rated
 * @access  Public
 */
exports.getTopRatedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ isTopRated: true });
    
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Récupérer les films par genre
 * @route   GET /api/movies/genre/:genre
 * @access  Public
 */
exports.getMoviesByGenre = async (req, res, next) => {
  try {
    const { genre } = req.params;
    
    // Vérifier si le genre est valide
    const validGenres = [
      'action', 'adventure', 'animation', 'comedy', 'crime',
      'documentary', 'drama', 'family', 'fantasy', 'history',
      'horror', 'music', 'mystery', 'romance', 'science-fiction',
      'thriller', 'war', 'western'
    ];
    
    if (!validGenres.includes(genre)) {
      return res.status(400).json({
        success: false,
        error: 'Genre invalide'
      });
    }
    
    const movies = await Movie.find({ genres: genre });
    
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Rechercher des films
 * @route   GET /api/movies/search
 * @access  Public
 */
exports.searchMovies = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Veuillez fournir un terme de recherche'
      });
    }
    
    // Recherche par titre ou description avec une expression régulière
    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });
    
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Créer un nouveau film (Admin)
 * @route   POST /api/movies
 * @access  Private/Admin
 */
exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Mettre à jour un film (Admin)
 * @route   PUT /api/movies/:id
 * @access  Private/Admin
 */
exports.updateMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Film non trouvé'
      });
    }
    
    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Supprimer un film (Admin)
 * @route   DELETE /api/movies/:id
 * @access  Private/Admin
 */
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Film non trouvé'
      });
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};