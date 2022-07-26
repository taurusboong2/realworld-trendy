import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import {
  createNewArticle,
  deleteArticle,
  editArticle,
  fetchArticle,
  fetchArticlebyOffset,
  fetchArticleList,
} from '../networks/articles';
import { useFetchCurrentUser } from './auth.hook';

export const useFetchArticleList = () => {
  return useQuery('article-list', fetchArticleList, {
    select: data => {
      const articles = data?.data.articles;
      return articles;
    },
  });
};

export const useFetchArticleCount = () => {
  return useQuery('articles-count', fetchArticleList, {
    select: data => {
      const counts = data?.data.articlesCount;
      return counts;
    },
  });
};

export const useCreateNewArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(createNewArticle, {
    onSuccess: _data => {
      alert('게시글이 성공적으로 생성되었습니다.');
      navigate('/');
      queryClient.invalidateQueries('articles');
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useFetchArticle = (slug: string, shouldFetch?: boolean) => {
  return useQuery(['article', slug], () => fetchArticle(slug), {
    retry: false,
    enabled: shouldFetch,
  });
};

export const useDeleteArticle = (slug: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(deleteArticle, {
    onSuccess: _data => {
      queryClient.invalidateQueries(['article-list']);
      queryClient.removeQueries(['article', slug]);
      navigate('/profile');
    },
  });
};

export const useUpdateArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(editArticle, {
    onSuccess: _data => {
      alert('게시글이 성공적으로 수정되었습니다.');
      navigate('/');
      queryClient.invalidateQueries(['article-list']);
      queryClient.invalidateQueries(['articles']);
      queryClient.invalidateQueries(['article']);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useFetchArticleListByOffset = () => {
  const { data: user } = useFetchCurrentUser();
  const { data: counts } = useFetchArticleCount();
  const count: number[] = [0];

  const { isLoading, data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    'articles',
    ({ pageParam }) => fetchArticlebyOffset({ pageParam }),
    {
      enabled: !!user,
      getNextPageParam: (lastPage, page) => {
        const nextPage = (counts as number) < count.at(-1)! ? undefined : page.length * 5;
        count.push(nextPage as number);
        return nextPage;
      },
      retry: false,
      staleTime: Infinity,
    }
  );

  return { isLoading, data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage };
};
