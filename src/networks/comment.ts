import { apiWithAuth } from '../config/api';
import { CommentType, MutationAddCommentProps } from '../types/comment';

export const addComment = async ({ props: { slug, comments } }: MutationAddCommentProps) => {
  const response = await apiWithAuth.post<CommentType>(`/articles/${slug}/comments`, comments);
  return response;
};
