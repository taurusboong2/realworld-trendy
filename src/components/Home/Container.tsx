import React, { FC } from 'react';
import { useFetchArticleList } from '../../hooks/article.hook';
import Feed from '../common/Feed';
import LoadingSpinner from '../common/LoadingSpinner';
import Sidebar from './SideBar';

const Container: FC = () => {
  const { data: articles, isLoading } = useFetchArticleList();
  console.log(`articles:`, articles);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            <>
              {articles?.map(article => {
                return (
                  <Feed
                    slug={article.slug}
                    key={article.slug}
                    author={article.author.username}
                    date={article.createdAt}
                    heart={article.favoritesCount}
                    title={article.title}
                    description={article.description}
                  />
                );
              })}
            </>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Container;
