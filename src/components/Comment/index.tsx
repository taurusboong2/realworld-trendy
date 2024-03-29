import React, { FC } from 'react';
import MyLink from '../common/MyLink';
import DeleteBtn from './DeleteBtn';
import { useParams } from 'react-router';
import { CommentDataType } from '@/types/comment';
import { useDeleteComment } from '@/hooks/comment.hook';
import LoadingSpinner from '../common/LoadingSpinner';

type Props = {
  comment: CommentDataType;
  isFetching: boolean;
};

const Comment: FC<Props> = ({ comment, isFetching }) => {
  const { slug } = useParams();

  const { mutate: deleteComment, isLoading } = useDeleteComment();

  const handleDelete = async () => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      await deleteComment({
        props: {
          slug: slug as string,
          id: comment.id,
        },
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isFetching) return <></>;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <MyLink href="/profile" className="comment-author">
          <img src={comment.author.image} alt="Comment author's profile image" className="comment-author-img" />
        </MyLink>
        &nbsp;
        <MyLink href="profile" className="comment-author">
          {comment.author.username}
        </MyLink>
        <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
        <div>
          <DeleteBtn removeComment={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
