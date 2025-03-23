const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Veuillez ajouter un titre'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'Veuillez ajouter une description'],
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Veuillez ajouter une année de sortie']
  },
  duration: {
    type: Number,
    required: [true, 'Veuillez ajouter une durée en minutes']
  },
  genres: {
    type: [String],
    required: [true, 'Veuillez ajouter au moins un genre'],
    enum: [
      'action',
      'adventure',
      'animation',
      'comedy',
      'crime',
      'documentary',
      'drama',
      'family',
      'fantasy',
      'history',
      'horror',
      'music',
      'mystery',
      'romance',
      'science-fiction',
      'thriller',
      'war',
      'western'
    ]
  },
  director: {
    type: String,
    required: [true, 'Veuillez ajouter un réalisateur']
  },
  cast: {
    type: [String],
    required: [true, 'Veuillez ajouter des acteurs']
  },
  poster_path: {
    type: String,
    required: [true, 'Veuillez ajouter une URL pour l\'affiche']
  },
  backdrop_path: {
    type: String,
    required: [true, 'Veuillez ajouter une URL pour l\'image de fond']
  },
  videoUrl: {
    type: String,
    required: [true, 'Veuillez ajouter une URL pour la vidéo']
  },
  trailerUrl: {
    type: String,
    required: false
  },
  maturityRating: {
    type: String,
    required: [true, 'Veuillez ajouter une classification d\'âge'],
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA']
  },
  vote_average: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  vote_count: {
    type: Number,
    default: 0
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isTopRated: {
    type: Boolean,
    default: false
  },
  isOriginal: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour mettre à jour la date de modification
MovieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Movie', MovieSchema);