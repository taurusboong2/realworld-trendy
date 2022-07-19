import React, { FC, useEffect } from 'react';
import { useFetchArticleList } from '../../hooks/article.hook';
import Feed from '../common/Feed';
import LoadingSpinner from '../common/LoadingSpinner';
import Sidebar from './SideBar';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
// sdsd
import { apiWithAuth } from '../../config/api';
import axios from 'axios';
import {  ArticleType } from '../../types/article';

type Props = {
  pageParam: number;
}

const Container: FC = () => {
  const { ref,inView } = useInView();
  // const { data: articles, isLoading } = useFetchArticleList();

  const getArticles = async ({ pageParam=0 }:Props ) => {
    const res = await apiWithAuth.get(`/articles?limit=10&offset=${pageParam}`)
    const data = res.data;
    console.log(`아티클 찍어봄:`,data)
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
  })

  const handleOnClick = async() => {
    await fetchNextPage()
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  },[inView])

  if (isLoading) return <h2>Loading...</h2>
  return (
    <>
      <h2>Infinite Scroll View</h2>
      {
        data?.pages.map(page => {
          return (
            <div key={page}>
              {
                page.articles.map((article: ArticleType) => {
                  return (
                    <div key={article.slug} ref={ref }>
                      <h2>{article.title}</h2>
                    </div>
                  )
                })
              }
            </div>
          )
        }
        )
      }

      <div className='btn-container'>
          <button onClick={handleOnClick}>Load More</button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      {/* <div className="container page">
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
      </div> */}
    </>
  );
};

export default Container;
