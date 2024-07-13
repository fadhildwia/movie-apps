import axios from 'axios';

const BASE_URL = 'https://www.omdbapi.com';

const api = axios.create({
  baseURL: `${BASE_URL}`
});

export default api;
