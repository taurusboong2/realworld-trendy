import { getTokenFromStorage } from '../commons/tokenStorage';
import { apiWithAuth } from '../config/api';
import { NewArticleData } from '../types/article';

export const fetchArticleList = () => {
  if (!getTokenFromStorage()) return;
  if (getTokenFromStorage()) {
    const response = apiWithAuth.get(`/articles`);
    return response;
  }
  return null;
};

export const createNewArticle = (newArticleData: NewArticleData) => {
  const response = apiWithAuth.post(`/articles`, newArticleData);
  return response;
};
