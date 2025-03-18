import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendSystemQuery = async (query) => {
  try {
    const response = await api.post('/ask', { query });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'An error occurred';
  }
};