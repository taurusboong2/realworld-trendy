import React, { FC, ReactEventHandler } from 'react';
import { useFetchCurrentUser } from '../../hooks/auth.hook';
import { ArticleType } from '../../types/article';
import MyLink from '../common/MyLink';

type Props = {
  articleData: ArticleType;
  deleteHandler: ReactEventHandler<HTMLButtonElement>;
};

const ProfileBox: FC<Props> = ({ articleData, deleteHandler }) => {
  const { data: currentUser } = useFetchCurrentUser();
  const { author } = articleData;

  return (
    <>
      <div className="article-actions">
        <div className="article-meta">
          <a href="profile.html">
            <img src={author.image} />
          </a>
          <div className="info">
            <a href="" className="author">
              {author.username}
            </a>
            <span className="date"> {new Date(articleData.createdAt).toDateString()}</span>
          </div>
          {currentUser !== undefined ? (
            <>
              <MyLink href={`/edit/${articleData.slug}`} className="btn btn-outline-secondary btn-sm">
                <i className="ion-edit" /> Edit Article
              </MyLink>
              &nbsp;&nbsp;
              <button className="btn btn-outline-danger btn-sm" onClick={deleteHandler}>
                <i className="ion-trash-a" /> Delete articleData
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {author.username}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">(29)</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
