import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addComment, deleteComment, fetchComments } from '../networks/comment';

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: _data => {
      alert('댓글이 성공적으로 작성되었습니다.');
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
      alert('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries('comment-list');
    },
  });
};
