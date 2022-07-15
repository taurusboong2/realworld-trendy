import React from 'react';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useFetchArticle } from '../hooks/article.hook';
import Banner from '../components/Article/Banner';
import { ArticleType } from '../types/article';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { data, isLoading } = useFetchArticle(slug as string);

  const articleData = data?.data.article;
  console.log(`data:`, articleData);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="article-page">
        <Banner articleData={articleData as ArticleType} />

        <h2>본문자리</h2>
        <h2>userbox자리</h2>
        <div className="container page">
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">커멘트리스트 자리</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
