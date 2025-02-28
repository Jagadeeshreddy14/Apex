import axios from 'axios';

export const axiosi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://apex-store-backend.onrender.com',
  withCredentials: true
});