import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';
const MOVIES_API = `${API_URL}/movies`;

/**
 * Récupère les films tendance
 */
export const getTrending = async () => {
  try {
    const response = await axios.get(`${MOVIES_API}/trending`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Récupère les films les mieux notés
 */
export const getTopRated = async () => {
  try {
    const response = await axios.get(`${MOVIES_API}/top-rated`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Récupère les films par genre
 * @param {string} genre - Le genre de films à récupérer
 */
export const getMovies = async (genre) => {
  try {
    const response = await axios.get(`${MOVIES_API}/genre/${genre}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Récupère les détails d'un film
 * @param {string} id - L'identifiant du film
 */
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${MOVIES_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Recherche de films
 * @param {string} query - La requête de recherche
 */
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${MOVIES_API}/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Ajoute un film à la liste de l'utilisateur
 * @param {string} movieId - L'identifiant du film
 */
export const addToMyList = async (movieId) => {
  try {
    const response = await axios.post(`${API_URL}/mylist`, { movieId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Supprime un film de la liste de l'utilisateur
 * @param {string} movieId - L'identifiant du film
 */
export const removeFromMyList = async (movieId) => {
  try {
    const response = await axios.delete(`${API_URL}/mylist/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Récupère la liste de l'utilisateur
 */
export const getMyList = async () => {
  try {
    const response = await axios.get(`${API_URL}/mylist`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};