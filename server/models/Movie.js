const { v4: uuidv4 } = require('uuid');

// Base de données en mémoire pour les films
const movies = [];

// Ajouter quelques films par défaut
const createDefaultMovies = () => {
  const defaultMovies = [
    {
      _id: '1',
      title: 'Stranger Things',
      description: 'Quand un jeune garçon disparaît, une petite ville découvre une mystérieuse affaire, des expériences secrètes, des forces surnaturelles terrifiantes... et une fillette.',
      releaseYear: 2016,
      duration: 50,
      genres: ['drama', 'fantasy', 'horror'],
      director: 'The Duffer Brothers',
      cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      poster_path: 'https://www.example.com/posters/stranger-things.jpg',
      backdrop_path: 'https://www.example.com/backdrops/stranger-things.jpg',
      videoUrl: 'https://www.example.com/videos/stranger-things.mp4',
      trailerUrl: 'https://www.example.com/trailers/stranger-things.mp4',
      maturityRating: 'TV-14',
      vote_average: 8.7,
      vote_count: 5432,
      isTrending: true,
      isTopRated: true,
      isOriginal: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '2',
      title: 'The Crown',
      description: 'Cette série dramatique se concentre sur la reine Élisabeth II, alors que de jeunes souverains font face à un empire en déclin.',
      releaseYear: 2016,
      duration: 60,
      genres: ['drama', 'history'],
      director: 'Peter Morgan',
      cast: ['Olivia Colman', 'Tobias Menzies', 'Helena Bonham Carter'],
      poster_path: 'https://www.example.com/posters/the-crown.jpg',
      backdrop_path: 'https://www.example.com/backdrops/the-crown.jpg',
      videoUrl: 'https://www.example.com/videos/the-crown.mp4',
      trailerUrl: 'https://www.example.com/trailers/the-crown.mp4',
      maturityRating: 'TV-MA',
      vote_average: 8.6,
      vote_count: 3217,
      isTrending: false,
      isTopRated: true,
      isOriginal: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  movies.push(...defaultMovies);
  console.log('Films par défaut créés');
};

// Créer les films par défaut
createDefaultMovies();

// Classe Movie qui émule le modèle Mongoose
class Movie {
  static async find(filter = {}) {
    let result = [...movies];
    
    // Filtrer par genre si spécifié
    if (filter.genres) {
      result = result.filter(movie => 
        movie.genres.some(genre => filter.genres.includes(genre))
      );
    }
    
    // Filtrer les films tendance
    if (filter.isTrending === true) {
      result = result.filter(movie => movie.isTrending === true);
    }
    
    // Filtrer les films les mieux notés
    if (filter.isTopRated === true) {
      result = result.filter(movie => movie.isTopRated === true);
    }
    
    // Filtrer les originaux
    if (filter.isOriginal === true) {
      result = result.filter(movie => movie.isOriginal === true);
    }
    
    return result.map(movie => ({
      ...movie,
      _doc: { ...movie }
    }));
  }
  
  static async findById(id) {
    const movie = movies.find(movie => movie._id === id);
    if (!movie) return null;
    
    return {
      ...movie,
      _doc: { ...movie }
    };
  }
  
  static async create(movieData) {
    const newMovie = {
      _id: uuidv4(),
      ...movieData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    movies.push(newMovie);
    
    return {
      ...newMovie,
      _doc: { ...newMovie }
    };
  }
  
  static async findByIdAndUpdate(id, update, options = {}) {
    const movieIndex = movies.findIndex(movie => movie._id === id);
    if (movieIndex === -1) return null;
    
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...update,
      updatedAt: new Date()
    };
    
    return {
      ...movies[movieIndex],
      _doc: { ...movies[movieIndex] }
    };
  }
  
  static async findByIdAndDelete(id) {
    const movieIndex = movies.findIndex(movie => movie._id === id);
    if (movieIndex === -1) return null;
    
    const deletedMovie = movies[movieIndex];
    movies.splice(movieIndex, 1);
    
    return {
      ...deletedMovie,
      _doc: { ...deletedMovie }
    };
  }
  
  static async countDocuments(filter = {}) {
    let count = movies.length;
    
    // Appliquer les filtres si nécessaire
    if (Object.keys(filter).length > 0) {
      const filteredMovies = await this.find(filter);
      count = filteredMovies.length;
    }
    
    return count;
  }
}

module.exports = Movie;