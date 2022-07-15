import { getTokenFromStorage } from '../commons/tokenStorage';
import { apiWithAuth, api } from '../config/api';
import { ArticleListType, NewArticleData, ArticleDataType } from '../types/article';

export const fetchArticleList = async () => {
  if (!getTokenFromStorage()) return;
  if (getTokenFromStorage()) {
    const response = await apiWithAuth.get<ArticleListType>(`/articles`);
    return response;
  }
  return null;
};

export const createNewArticle = async (newArticleData: NewArticleData) => {
  const response = await apiWithAuth.post<NewArticleData>(`/articles`, newArticleData);
  return response;
};

export const fetchArticle = async (slug: string) => {
  const response = await api.get<ArticleDataType>(`/articls/${slug}`);
  return response;
};
