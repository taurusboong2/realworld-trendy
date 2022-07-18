import React, { FC } from 'react';

import MyLink from '../common/MyLink';
import { CommentDataType } from '../../types/comment';
import { useFetchCurrentUser } from '../../hooks/auth.hook';

type Props = {
  comment: CommentDataType;
};

const Comment: FC<Props> = ({ comment }) => {
  const { data: user } = useFetchCurrentUser();

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
      </div>
    </div>
  );
};

export default Comment;
