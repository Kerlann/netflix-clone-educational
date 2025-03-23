const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Chargement des variables d'environnement
dotenv.config();

// Connexion à la base de données (simule une connexion)
connectDB();

// Initialisation de l'application Express
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/mylist', require('./routes/mylistRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Route pour tester l'API
app.get('/', (req, res) => {
  res.json({ message: 'API Netflix Clone fonctionne correctement' });
});

// Middleware de gestion des erreurs
app.use(errorHandler);

// Définition du port
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.log(`Erreur: ${err.message}`);
  // Fermeture du serveur
  server.close(() => process.exit(1));
});