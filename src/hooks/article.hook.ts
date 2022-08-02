import { getTokenFromStorage } from '@/commons/tokenStorage';
import { createToast } from '@/components/common/Toast';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import {
  createNewArticle,
  deleteArticle,
  editArticle,
  fetchArticle,
  fetchArticlebyOffset,
  fetchArticleCounts,
  fetchArticleList,
} from '../networks/articles';
import { useFetchCurrentUser } from './auth.hook';
import * as messages from '@/constants/messages';

export const useFetchArticleList = () => {
  return useQuery('article-list', fetchArticleList, {
    select: data => {
      const articles = data?.data.articles;
      return articles;
    },
    retry: false,
  });
};

export const useFetchArticleCount = () => {
  const token = getTokenFromStorage();
  return useQuery('articles-count', fetchArticleCounts, {
    enabled: !!token,
    select: data => {
      const counts = data?.data.articlesCount;
      return counts;
    },
    retry: false,
  });
};

export const useCreateNewArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(createNewArticle, {
    onSuccess: _data => {
      createToast({
        message: messages.ARTICLE_createDone,
        type: 'info',
      });
      navigate('/');
      queryClient.invalidateQueries('articles');
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
      createToast({
        message: messages.ARTICLE_updateDone,
        type: 'info',
      });
      navigate('/');
      queryClient.invalidateQueries(['article-list']);
      queryClient.invalidateQueries(['articles']);
      queryClient.invalidateQueries(['article']);
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
        const nextPage = (counts as number) < (count.at(-1) as number) ? undefined : page.length * 5;
        count.push(nextPage as number);
        return nextPage;
      },
      retry: false,
      staleTime: Infinity,
    }
  );

  return { isLoading, data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage };
};
