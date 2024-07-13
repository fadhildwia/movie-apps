import axios from 'axios';

const BASE_URL = 'http://www.omdbapi.com/';

const api = axios.create({
  baseURL: `${BASE_URL}?apikey=${import.meta.env.VITE_APP_OMDB_KEY}&`
});

export default api;
