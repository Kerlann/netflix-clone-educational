const User = require('../models/User');
const Movie = require('../models/Movie');

/**
 * @desc    Récupérer la liste personnelle de l'utilisateur
 * @route   GET /api/mylist
 * @access  Private
 */
exports.getMyList = async (req, res, next) => {
  try {
    // Avec notre modèle en mémoire, il n'y a pas de populate réel
    // Alors nous devons faire manuellement la récupération des films
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    // Récupérer tous les films de la liste de l'utilisateur
    const myListMovies = [];
    for (const movieId of user.myList) {
      const movie = await Movie.findById(movieId.toString());
      if (movie) {
        myListMovies.push(movie);
      }
    }
    
    res.status(200).json(myListMovies);
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
      message: 'Film ajouté à votre liste'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Supprimer un film de la liste personnelle
 * @route   DELETE /api/mylist/:movieId
 * @access  Private
 */
exports.removeFromMyList = async (req, res, next) => {
  try {
    // Récupérer l'ID du film depuis les paramètres de la requête
    const { movieId } = req.params;
    
    // Récupérer l'utilisateur
    const user = await User.findById(req.user.id);
    
    // Vérifier si le film est dans la liste
    const isInList = user.myList.some(id => id.toString() === movieId);
    
    if (!isInList) {
      return res.status(400).json({
        success: false,
        error: 'Ce film n\'est pas dans votre liste'
      });
    }
    
    // Retirer le film de la liste
    user.myList = user.myList.filter(id => id.toString() !== movieId);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Film retiré de votre liste'
    });
  } catch (err) {
    next(err);
  }
};