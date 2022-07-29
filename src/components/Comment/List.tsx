import React from 'react';
import Comment from '.';
import { useParams } from 'react-router';
import { useFetchComments } from '@/hooks/comment.hook';
import LoadingSpinner from '../common/LoadingSpinner';
import { CommentDataType } from '@/types/comment';

const List = () => {
  const { slug } = useParams();
  const { data: comments, isLoading } = useFetchComments(slug as string);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      {comments?.comments.map((comment: CommentDataType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default List;
