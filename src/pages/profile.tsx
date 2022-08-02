import React from 'react';
import UserInfo from '../components/Profile/UserInfo';
import { useFetchArticleList } from '../hooks/article.hook';
import { useCheckAuth } from '../hooks/auth.hook';
import Feed from '../components/common/Feed';
import { ArticleType } from '../types/article';

const Profile = () => {
  const { data: articles } = useFetchArticleList();

  useCheckAuth();

  return (
    <>
      <div className="profile-page">
        <UserInfo />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <span className="nav-link active">My Articles</span>
                  </li>
                </ul>
              </div>
              {articles?.map((article: ArticleType) => {
                return (
                  <Feed
                    key={article.slug}
                    author={article.author.username}
                    date={article.createdAt}
                    heart={article.favoritesCount}
                    title={article.title}
                    description={article.description}
                    slug={article.slug}
                    image={article.author.image}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
