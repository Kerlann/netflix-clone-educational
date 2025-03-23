const User = require('../models/User');
const Movie = require('../models/Movie');

/**
 * @desc    Récupérer les statistiques générales
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
exports.getStats = async (req, res, next) => {
  try {
    // Compter les utilisateurs
    const userCount = await User.countDocuments();
    
    // Compter les films
    const movieCount = await Movie.countDocuments();
    
    // Compter les films tendance
    const trendingCount = await Movie.countDocuments({ isTrending: true });
    
    // Compter les films les mieux notés
    const topRatedCount = await Movie.countDocuments({ isTopRated: true });
    
    // Compter les utilisateurs par rôle
    const adminCount = await User.countDocuments({ role: 'admin' });
    const regularUserCount = await User.countDocuments({ role: 'user' });
    
    res.status(200).json({
      success: true,
      data: {
        userStats: {
          total: userCount,
          admin: adminCount,
          regular: regularUserCount
        },
        movieStats: {
          total: movieCount,
          trending: trendingCount,
          topRated: topRatedCount
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Récupérer la liste de tous les utilisateurs
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Récupérer un utilisateur par ID
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Mettre à jour un utilisateur
 * @route   PUT /api/admin/users/:id
 * @access  Private/Admin
 */
exports.updateUser = async (req, res, next) => {
  try {
    // Ne pas permettre la mise à jour du mot de passe via cette route
    const { password, ...updateData } = req.body;
    
    // Protéger l'administrateur de se dégrader lui-même
    if (req.params.id === req.user.id && updateData.role && updateData.role !== 'admin') {
      return res.status(400).json({
        success: false,
        error: 'Vous ne pouvez pas modifier votre propre rôle d\'administrateur'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Supprimer un utilisateur
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res, next) => {
  try {
    // Empêcher l'administrateur de se supprimer lui-même
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'Vous ne pouvez pas supprimer votre propre compte'
      });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    
    await user.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Promouvoir un utilisateur au rang d'administrateur
 * @route   PUT /api/admin/users/:id/promote
 * @access  Private/Admin
 */
exports.promoteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        error: 'Cet utilisateur est déjà administrateur'
      });
    }
    
    user.role = 'admin';
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Rétrograder un administrateur en utilisateur normal
 * @route   PUT /api/admin/users/:id/demote
 * @access  Private/Admin
 */
exports.demoteUser = async (req, res, next) => {
  try {
    // Empêcher l'administrateur de se rétrograder lui-même
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'Vous ne pouvez pas vous rétrograder vous-même'
      });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    
    if (user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        error: 'Cet utilisateur n\'est pas administrateur'
      });
    }
    
    user.role = 'user';
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};