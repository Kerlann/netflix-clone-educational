const express = require('express');
const {
  getStats,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  promoteUser,
  demoteUser
} = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Toutes les routes nécessitent une authentification et des droits d'administrateur
router.use(protect);
router.use(authorize('admin'));

// Statistiques générales
router.get('/stats', getStats);

// Gestion des utilisateurs
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Promotion/rétrogradation des utilisateurs
router.put('/users/:id/promote', promoteUser);
router.put('/users/:id/demote', demoteUser);

module.exports = router;