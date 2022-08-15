import { getTokenFromStorage } from '../commons/tokenStorage';
import { apiWithAuth, api } from '../config/api';
import {
  ArticleListType,
  NewArticleData,
  ArticleDataType,
  ArticleType,
  updateMutation,
  OffsetProps,
  ArticlesCount,
} from '../types/article';

export const fetchArticleList = async () => {
  if (!getTokenFromStorage()) return;
  if (getTokenFromStorage()) {
    const response = await apiWithAuth.get<ArticleListType>(`/articles?limit=70`);
    return response;
  }
  return null;
};

export const fetchArticleCounts = async () => {
  const response = await apiWithAuth.get<ArticlesCount>(`/articles`);
  return response;
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

export const editArticle = async ({ props: { slug, newData } }: updateMutation) => {
  await apiWithAuth.put<ArticleType>(`/articles/${slug}`, newData);
};

export const fetchArticlebyOffset = async ({ pageParam = 0 }: OffsetProps) => {
  const res = await apiWithAuth.get<ArticleListType>(`/articles?limit=5&offset=${pageParam}`);
  const data = res.data;
  return data;
};
