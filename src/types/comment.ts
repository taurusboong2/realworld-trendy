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

export type CommentType = {
  comment: {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: CommentUserType;
  };
};
