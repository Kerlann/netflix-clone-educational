/**
 * Fonction mock pour la connexion à la base de données
 * Comme nous n'utilisons pas de base de données, cette fonction
 * ne fait rien mais évite les erreurs de connexion
 */
const connectDB = async () => {
  try {
    console.log('Mode sans base de données activé');
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;