import { CommentUserType } from './auth';

export type AddCommentType = {
  comment: {
    body: string;
  };
};

export type MutationAddCommentProps = {
  props: {
    slug: string;
    comments: AddCommentType;
  };
};

export type MutationDeleteCommentProps = {
  props: {
    slug: string;
    id: number;
  };
};

export type CommentDataType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: CommentUserType;
};

export type CommentType = {
  comment: CommentDataType;
};

export type MultipleCommentsType = {
  comments: CommentDataType[];
};
