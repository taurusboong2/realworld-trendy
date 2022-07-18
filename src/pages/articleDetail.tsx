import React from 'react';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useDeleteArticle, useFetchArticle } from '../hooks/article.hook';
import Banner from '../components/Article/Banner';
import Container from '../components/Article/Container';
import { ArticleType } from '../types/article';
import ProfileBox from '../components/Article/ProfileBox';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { data, isLoading } = useFetchArticle(slug as string);
  const { mutate: deleteArticle } = useDeleteArticle(slug as string);

  const submitDeleteArticle = async () => {
    const result = confirm('정말로 게시글을 삭제하시겠습니까?');
    if (!result) return;
    await deleteArticle(slug as string);
  };

  const articleData = data?.data.article;

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="article-page">
        <Banner articleData={articleData as ArticleType} />

        <div className="container page">
          <Container articleData={articleData as ArticleType} />

          <hr />

          <ProfileBox articleData={articleData as ArticleType} deleteHandler={submitDeleteArticle} />

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">커멘트리스트 자리</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
