import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const API = axios.create({
  baseURL: apiUrl
});

export default API;
