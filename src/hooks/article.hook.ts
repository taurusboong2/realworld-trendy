import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { createNewArticle, fetchArticleList } from '../networks/articles';
import { ArticleType } from '../types/article';

export const useFetchArticleList = () => {
  return useQuery('article-list', fetchArticleList, {
    select: data => {
      const articles: ArticleType[] = data?.data.articles;
      return articles;
    },
  });
};

export const useCreateNewArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(createNewArticle, {
    onSuccess: _data => {
      alert('게시글이 성공적으로 생성되었습니다.');
      queryClient.invalidateQueries('article-list');
      navigate('/');
    },
    onError: error => {
      console.log(error);
    },
  });
};
