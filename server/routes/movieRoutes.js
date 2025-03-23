const express = require('express');
const {
  getMovies,
  getMovieById,
  getTrending,
  getTopRated,
  getMoviesByGenre,
  searchMovies,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Routes publiques
router.get('/', getMovies);
router.get('/trending', getTrending);
router.get('/top-rated', getTopRated);
router.get('/genre/:genre', getMoviesByGenre);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);

// Routes d'administration (protégées et réservées aux admins)
router.post('/', protect, authorize('admin'), createMovie);
router.put('/:id', protect, authorize('admin'), updateMovie);
router.delete('/:id', protect, authorize('admin'), deleteMovie);

module.exports = router;