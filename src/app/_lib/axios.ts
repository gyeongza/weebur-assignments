import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const externalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DUMMY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
