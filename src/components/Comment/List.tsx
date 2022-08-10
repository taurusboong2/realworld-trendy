import React from 'react';
import Comment from '.';
import { useParams } from 'react-router';
import { useFetchComments } from '@/hooks/comment.hook';
import { CommentDataType } from '@/types/comment';

const List = () => {
  const { slug } = useParams();
  const { data: comments, isFetching } = useFetchComments(slug as string);

  return (
    <div>
      {comments?.comments.map((comment: CommentDataType) => (
        <Comment key={comment.id} comment={comment} isFetching={isFetching} />
      ))}
    </div>
  );
};

export default List;
