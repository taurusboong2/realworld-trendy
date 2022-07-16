import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { createNewArticle, deleteArticle, fetchArticle, fetchArticleList } from '../networks/articles';

export const useFetchArticleList = () => {
  return useQuery('article-list', fetchArticleList, {
    select: data => {
      const articles = data?.data.articles;
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

export const useFetchArticle = (slug: string) => {
  return useQuery(['article', slug], () => fetchArticle(slug), {
    onSuccess: data => {
      console.log(data);
    },
    retry: false,
  });
};

export const useDeleteArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(deleteArticle, {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries('article-list');
      navigate('/profile');
    },
  });
};
