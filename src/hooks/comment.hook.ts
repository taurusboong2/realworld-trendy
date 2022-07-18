import { useMutation, useQueryClient } from 'react-query';
import { addComment } from '../networks/comment';

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: data => {
      console.log(data);
    },
  });
};
