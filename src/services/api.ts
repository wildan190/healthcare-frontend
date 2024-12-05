import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // URL backend Anda
});

export default api;
