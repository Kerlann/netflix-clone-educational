const express = require('express');
const {
  getMyList,
  addToMyList,
  removeFromMyList
} = require('../controllers/mylistController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes pour la gestion des listes personnelles
router.get('/', getMyList);
router.post('/', addToMyList);
router.delete('/:id', removeFromMyList);

module.exports = router;