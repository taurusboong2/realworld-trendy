import React, { FC, useRef } from 'react';
import MyLink from '../common/MyLink';
import LoadingSpinner from '../common/LoadingSpinner';
import { useFetchCurrentUser } from '../../hooks/auth.hook';
import { useAddComment, useFetchComments } from '../../hooks/comment.hook';
import { useParams } from 'react-router';
import { AddCommentType } from '../../types/comment';

const CommentForm: FC = () => {
  const { slug } = useParams();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { data: user } = useFetchCurrentUser();
  const { mutate: addComment, isLoading } = useAddComment();
  const { data: comments } = useFetchComments(slug as string);
  console.log(comments);

  const submitAddComment = async () => {
    console.log(`버튼누름`);
    const commentData = {
      comment: {
        body: commentRef.current?.value,
      },
    };
    await addComment({
      props: {
        slug: slug as string,
        comments: commentData as AddCommentType,
      },
    });
  };

  if (!user) {
    return (
      <p>
        <MyLink href="/login">Sign in</MyLink>
        &nbsp;or&nbsp;
        <MyLink href="/register">sign up</MyLink>
        &nbsp;to add comments on this article.
      </p>
    );
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    <form className="card comment-form" onSubmit={submitAddComment}>
      <div className="card-block">
        <textarea rows={3} className="form-control" placeholder="Write a comment..." ref={commentRef} />
      </div>
      <div className="card-footer">
        <img className="comment-author-img" src={user.image as string} />
        <button className="btn btn-sm btn-primary" type="button" onClick={submitAddComment} disabled={isLoading}>
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
