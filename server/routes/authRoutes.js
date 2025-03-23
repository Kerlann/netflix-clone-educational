const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Routes protégées (nécessitent authentification)
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;