/**
 * Gestionnaire d'erreurs pour l'API
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Journaliser l'erreur pour le développeur
  console.error(`${err.name}: ${err.message}`.red);
  
  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: message
    });
  }
  
  // Erreur de duplication Mongoose
  if (err.code === 11000) {
    const message = 'Dupliquer la valeur d\'un champ unique';
    return res.status(400).json({
      success: false,
      error: message
    });
  }
  
  // Erreur d'ID invalide
  if (err.name === 'CastError') {
    const message = 'Ressource non trouvée';
    return res.status(404).json({
      success: false,
      error: message
    });
  }

  // Erreur générique
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Erreur serveur'
  });
};

module.exports = errorHandler;