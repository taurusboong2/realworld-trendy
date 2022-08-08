import React, { FC, useRef } from 'react';
import MyLink from '../common/MyLink';
import { useFetchCurrentUser } from '@/hooks/auth.hook';
import { useAddComment } from '@/hooks/comment.hook';
import { useParams } from 'react-router';
import { AddCommentType } from '@/types/comment';

const CommentForm: FC = () => {
  const { slug } = useParams();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { data: user } = useFetchCurrentUser();
  const { mutate: addComment, isLoading } = useAddComment();

  const submitAddComment = async () => {
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
    commentRef.current!.value = '';
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
