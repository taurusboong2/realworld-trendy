import { getTokenFromStorage } from '../commons/tokenStorage';
import { apiWithAuth } from '../config/api';

export const fetchArticleList = () => {
  if (!getTokenFromStorage()) return;
  if (getTokenFromStorage()) {
    const response = apiWithAuth.get(`/articles`);
    return response;
  }
  return null;
};
