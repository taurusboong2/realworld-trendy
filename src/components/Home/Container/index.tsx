import React, { FC, Fragment, useEffect } from 'react';
import Feed from '@/components/common/Feed';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useInView } from 'react-intersection-observer';
import { ArticleType } from '@/types/article';
import { useFetchArticleListByOffset } from '@/hooks/article.hook';
import ArticleListSkeleton from '@/components/Skeletons/ArticleListSkeleton';
import { notice } from '@/constants/noticeFeeds';

const Container: FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const { data, fetchNextPage, isFetching, isLoading, isFetchingNextPage, hasNextPage } = useFetchArticleListByOffset();

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
                  <span className="nav-link active">Global Feed</span>
                </li>
              </ul>
            </div>
            {(isFetching || isLoading) && <ArticleListSkeleton />}
            <>
              {data?.pages.map((page, index) => {
                return (
                  <div key={index}>
                    {page.articles.map((article: ArticleType) => {
                      const { slug, author, createdAt, title, description } = article;
                      return (
                        <Fragment key={slug}>
                          <Feed
                            slug={slug}
                            author={author.username}
                            date={createdAt}
                            title={title}
                            description={description}
                            image={author.image}
                          />
                          <hr ref={ref} />
                        </Fragment>
                      );
                    })}
                  </div>
                );
              })}
              <Feed
                noticeOpt={{ isNotice: true, noticeSlug: '공지사항' }}
                slug={notice.slug}
                author={notice.author}
                date={notice.date}
                title={notice.title}
                description={notice.description}
                image={notice.image}
              />
              {hasNextPage && isFetchingNextPage ? <LoadingSpinner /> : null}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
