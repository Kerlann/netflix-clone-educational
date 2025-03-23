/**
 * Middleware pour gérer les erreurs de manière centralisée
 */
const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  // Copier l'erreur
  let error = { ...err };
  error.message = err.message;

  // Erreur Mongoose : ID invalide
  if (err.name === 'CastError') {
    const message = `Ressource non trouvée avec l'ID ${err.value}`;
    error = new Error(message);
    error.statusCode = 404;
  }

  // Erreur Mongoose : Enregistrement en double
  if (err.code === 11000) {
    const message = 'Valeur dupliquée entrée';
    error = new Error(message);
    error.statusCode = 400;
  }

  // Erreur Mongoose : Validation
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new Error(message.join(', '));
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Erreur du serveur'
  });
};

module.exports = errorHandler;