const express = require('express');
const router = express.Router();
const { 
  getMovies, 
  getMovieById, 
  searchMovies, 
  getTrendingMovies, 
  getTopRatedMovies, 
  getMoviesByGenre 
} = require('../controllers/movieController');
const { protect } = require('../middlewares/authMiddleware');

// Route pour obtenir tous les films
router.get('/', getMovies);

// Route pour obtenir les films tendance
router.get('/trending', getTrendingMovies);

// Route pour obtenir les films les mieux notés
router.get('/top-rated', getTopRatedMovies);

// Route pour rechercher des films
router.get('/search', searchMovies);

// Route pour obtenir les films par genre
router.get('/genre/:genre', getMoviesByGenre);

// Route pour obtenir un film par ID
router.get('/:id', getMovieById);

module.exports = router;