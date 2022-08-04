import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addComment, deleteComment, fetchComments } from '../networks/comment';
import { createToast } from '@/components/common/Toast';
import * as messages from '@/constants/messages';

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: _data => {
      createToast({
        message: messages.COMMENT_createSuccess,
        type: 'info',
      });
      queryClient.invalidateQueries('comment-list');
    },
  });
};

export const useFetchComments = (slug: string) => {
  return useQuery(['comment-list', slug], () => fetchComments(slug), {
    select: data => {
      const comments = data.data;
      return comments;
    },
    retry: false,
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: 60000,
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteComment, {
    onSuccess: _data => {
      createToast({
        message: messages.COMMENT_deleteSuccess,
        type: 'warning',
      });
      queryClient.invalidateQueries('comment-list');
    },
  });
};
