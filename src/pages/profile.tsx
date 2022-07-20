import React from 'react';
import UserInfo from '../components/Profile/UserInfo';
import AuthCheck from '../components/common/AuthCheck';
import { useFetchArticleList } from '../hooks/article.hook';
import Feed from '../components/common/Feed';
import { ArticleType } from '../types/article';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const { data: articles, isLoading } = useFetchArticleList();

  return (
    <AuthCheck>
      <div className="profile-page">
        <UserInfo />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>
              {isLoading && <LoadingSpinner />}

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
    </AuthCheck>
  );
};

export default Profile;
