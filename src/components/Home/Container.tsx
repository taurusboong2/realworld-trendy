import React, { FC, Fragment, useEffect } from 'react';
import { useFetchArticleList } from '../../hooks/article.hook';
import Feed from '../common/Feed';
import LoadingSpinner from '../common/LoadingSpinner';
import Sidebar from './SideBar';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
//
import { apiWithAuth } from '../../config/api';
import {  ArticleType } from '../../types/article';

type Props = {
  pageParam: number;
}

const Container: FC = () => {
  const { ref, inView, } = useInView({
    threshold: 0.7,
  });

  const getArticles = async ({ pageParam=0 }:Props ) => {
    const res = await apiWithAuth.get(`/articles?limit=10&offset=${pageParam}`)
    const data = res.data;
    return data;
  }

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery('articles',({pageParam}) => getArticles({pageParam}), {
    getNextPageParam: (lastPage, page:any) => {
      const nextPage = page.length * 5;
      return nextPage;
    },
    retry: false,
    refetchOnMount: false
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  },[inView])

  if (isLoading) return <LoadingSpinner />
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
              {
                data?.pages.map((page, index) => {
                  return (
                    <div key={index}>
                      {
                        page.articles.map((article: ArticleType) => {
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
                          )
                        })
                      }
                    </div>
                  )
                }
                )
              }
              {isFetching || isFetchingNextPage ? <LoadingSpinner /> : null
              }
            </>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Container;
