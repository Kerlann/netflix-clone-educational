const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware pour protéger les routes
 * Vérifie si l'utilisateur est authentifié
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Vérifier si le token existe dans les headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Récupérer le token depuis le header Authorization (format: Bearer TOKEN)
      token = req.headers.authorization.split(' ')[1];
    }

    // Vérifier si le token existe
    if (!token) {
      // Pour les besoins du mode sans base de données, créons un utilisateur fictif
      if (process.env.NODE_ENV === 'development') {
        req.user = { id: 'admin-user-id', role: 'admin' };
        return next();
      }
      
      return res.status(401).json({
        success: false,
        error: 'Non autorisé à accéder à cette ressource'
      });
    }

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_for_development');

      // Attacher l'utilisateur à la requête
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      // Si le token est invalide mais que nous sommes en mode développement
      if (process.env.NODE_ENV === 'development') {
        req.user = { id: 'admin-user-id', role: 'admin' };
        return next();
      }
      
      return res.status(401).json({
        success: false,
        error: 'Non autorisé à accéder à cette ressource'
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware pour restreindre l'accès aux administrateurs
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Non autorisé à effectuer cette action'
      });
    }
    next();
  };
};