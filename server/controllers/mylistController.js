const User = require('../models/User');
const Movie = require('../models/Movie');

/**
 * @desc    Récupérer la liste personnelle de l'utilisateur
 * @route   GET /api/mylist
 * @access  Private
 */
exports.getMyList = async (req, res, next) => {
  try {
    // Récupérer l'utilisateur avec sa liste de films
    const user = await User.findById(req.user.id).populate('myList');
    
    res.status(200).json({
      success: true,
      count: user.myList.length,
      data: user.myList
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Ajouter un film à la liste personnelle
 * @route   POST /api/mylist
 * @access  Private
 */
exports.addToMyList = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    
    if (!movieId) {
      return res.status(400).json({
        success: false,
        error: 'Veuillez fournir un ID de film'
      });
    }
    
    // Vérifier que le film existe
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Film non trouvé'
      });
    }
    
    // Récupérer l'utilisateur
    const user = await User.findById(req.user.id);
    
    // Vérifier si le film est déjà dans la liste
    if (user.myList.includes(movieId)) {
      return res.status(400).json({
        success: false,
        error: 'Ce film est déjà dans votre liste'
      });
    }
    
    // Ajouter le film à la liste
    user.myList.push(movieId);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Film ajouté à votre liste',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Supprimer un film de la liste personnelle
 * @route   DELETE /api/mylist/:id
 * @access  Private
 */
exports.removeFromMyList = async (req, res, next) => {
  try {
    // Récupérer l'ID du film depuis les paramètres de la requête
    const { id } = req.params;
    
    // Récupérer l'utilisateur
    const user = await User.findById(req.user.id);
    
    // Vérifier si le film est dans la liste
    if (!user.myList.includes(id)) {
      return res.status(400).json({
        success: false,
        error: 'Ce film n\'est pas dans votre liste'
      });
    }
    
    // Retirer le film de la liste
    user.myList = user.myList.filter(movieId => movieId.toString() !== id);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Film retiré de votre liste',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};