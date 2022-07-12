import axios from 'axios';
import { getTokenFromStorage } from '../commons/tokenStorage';

const currentUserToken = getTokenFromStorage();

export const api = axios.create({
  baseURL: 'https://boong-realworld-api.herokuapp.com/api',
  headers: {
    'Content-Type': ' application/json; charset=utf-8',
  },
});

export const apiWithAuth = axios.create({
  baseURL: 'https://boong-realworld-api.herokuapp.com/api',
  headers: {
    'Content-Type': ' application/json; charset=utf-8',
    Authorization: `Token ${currentUserToken}`,
  },
});
