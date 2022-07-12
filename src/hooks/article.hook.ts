import { useQuery } from 'react-query';
import { fetchArticleList } from '../networks/articles';
import { ArticleType } from '../types/article';

export const useFetchArticleList = () => {
  return useQuery('article-list', fetchArticleList, {
    select: data => {
      const articles: ArticleType[] = data?.data.articles;
      return articles;
    },
  });
};
