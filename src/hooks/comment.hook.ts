import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addComment, fetchComments } from '../networks/comment';

export const useAddComment = () => {
  // const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: data => {
      console.log(data);
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
    notifyOnChangeProps: ['data', 'isFetching', 'refetch', 'isStale'],
    onSuccess: data => {
      console.log(data);
    },
  });
};
