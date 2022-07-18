import { apiWithAuth } from '../config/api';
import {
  CommentType,
  MultipleCommentsType,
  MutationAddCommentProps,
  MutationDeleteCommentProps,
} from '../types/comment';

export const addComment = async ({ props: { slug, comments } }: MutationAddCommentProps) => {
  const response = await apiWithAuth.post<CommentType>(`/articles/${slug}/comments`, comments);
  return response;
};

export const fetchComments = async (slug: string) => {
  const response = await apiWithAuth.get<MultipleCommentsType>(`/articles/${slug}/comments`);
  return response;
};

export const deleteComment = async ({ props: { slug, id } }: MutationDeleteCommentProps) => {
  const response = await apiWithAuth.delete(`/articles/${slug}/comments/${id}`);
  return response;
};
