const express = require('express');
const router = express.Router();
const { 
  getMyList, 
  addToMyList, 
  removeFromMyList 
} = require('../controllers/mylistController');
const { protect } = require('../middlewares/authMiddleware');

// Protection de toutes les routes
router.use(protect);

// Route pour obtenir tous les éléments de ma liste
router.route('/')
  .get(getMyList)
  .post(addToMyList);

// Route pour supprimer un élément de ma liste
router.delete('/:movieId', removeFromMyList);

module.exports = router;