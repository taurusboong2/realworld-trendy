import { getTokenFromStorage } from '../commons/tokenStorage';
import { apiWithAuth, api } from '../config/api';
import { ArticleListType, NewArticleData, ArticleDataType, ArticleType } from '../types/article';

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
  const response = await api.get<ArticleDataType>(`/articles/${slug}`);
  return response;
};

export const deleteArticle = async (slug: string) => {
  const response = await apiWithAuth.delete(`/articles/${slug}`);
  return response;
};

export const editArticle = async (slug: string, newData: any) => {
  const response = await apiWithAuth.put(`/articles/${slug}`, newData);
  return response;
};
