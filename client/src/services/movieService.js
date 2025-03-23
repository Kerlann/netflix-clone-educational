import apiClient from './apiService';

/**
 * Récupère les films tendance
 */
export const getTrending = async () => {
  try {
    const response = await apiClient.get('/movies/trending');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films tendance:', error);
    return [];
  }
};

/**
 * Récupère les films les mieux notés
 */
export const getTopRated = async () => {
  try {
    const response = await apiClient.get('/movies/top-rated');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films les mieux notés:', error);
    return [];
  }
};

/**
 * Récupère les films par genre
 * @param {string} genre - Le genre de films à récupérer
 */
export const getMovies = async (genre) => {
  try {
    const response = await apiClient.get(`/movies/genre/${genre}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des films du genre ${genre}:`, error);
    return [];
  }
};

/**
 * Récupère les détails d'un film
 * @param {string} id - L'identifiant du film
 */
export const getMovieDetails = async (id) => {
  try {
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails du film ${id}:`, error);
    throw error;
  }
};

/**
 * Recherche de films
 * @param {string} query - La requête de recherche
 */
export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get(`/movies/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche de films:', error);
    return [];
  }
};

/**
 * Ajoute un film à la liste de l'utilisateur
 * @param {string} movieId - L'identifiant du film
 */
export const addToMyList = async (movieId) => {
  try {
    const response = await apiClient.post('/mylist', { movieId });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film à la liste:', error);
    throw error;
  }
};

/**
 * Supprime un film de la liste de l'utilisateur
 * @param {string} movieId - L'identifiant du film
 */
export const removeFromMyList = async (movieId) => {
  try {
    const response = await apiClient.delete(`/mylist/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du film de la liste:', error);
    throw error;
  }
};

/**
 * Récupère la liste de l'utilisateur
 */
export const getMyList = async () => {
  try {
    const response = await apiClient.get('/mylist');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste personnelle:', error);
    return [];
  }
};