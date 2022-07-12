import React from 'react';
import { useFetchCurrentUser } from '../hooks/auth.hook';
import UserInfo from '../components/Profile/UserInfo';
import { useFetchArticleList } from '../hooks/article.hook';
import Feed from '../components/common/Feed';
import { ArticleType } from '../types/article';

const Profile = () => {
  const { data: user } = useFetchCurrentUser();
  const { data: articles } = useFetchArticleList();

  return (
    <>
      <div className="profile-page">
        <UserInfo userName={user?.username} userBio={user?.bio} userImage={user?.image || undefined} />

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
