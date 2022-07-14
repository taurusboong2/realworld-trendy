import axios from 'axios';
import { getTokenFromStorage } from '../commons/tokenStorage';

const USER_TOKEN = getTokenFromStorage();

export const api = axios.create({
  baseURL: 'https://boong-realworld-api.herokuapp.com/api',
  headers: {},
});

export const apiWithAuth = axios.create({
  baseURL: 'https://boong-realworld-api.herokuapp.com/api',
  headers: {
    Authorization: `Token ${USER_TOKEN}`,
  },
});
