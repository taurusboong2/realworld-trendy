import React, { FC, Fragment, useEffect } from 'react';
import Feed from '../common/Feed';
import LoadingSpinner from '../common/LoadingSpinner';
import Sidebar from './SideBar';
import { useInView } from 'react-intersection-observer';
import { ArticleType } from '../../types/article';
import { useFetchArticleListByOffset } from '../../hooks/article.hook';

const Container: FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = useFetchArticleListByOffset();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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
            {isFetching && <LoadingSpinner />}
            <>
              {data?.pages.map((page, index) => {
                return (
                  <div key={index}>
                    {page.articles.map((article: ArticleType) => {
                      return (
                        <Fragment key={article.slug}>
                          <Feed
                            slug={article.slug}
                            author={article.author.username}
                            date={article.createdAt}
                            heart={article.favoritesCount}
                            title={article.title}
                            description={article.description}
                          />
                          <hr ref={ref} />
                        </Fragment>
                      );
                    })}
                  </div>
                );
              })}
              {hasNextPage && isFetchingNextPage ? <LoadingSpinner /> : null}
            </>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Container;
