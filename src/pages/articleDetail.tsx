import React from 'react';
import CommentForm from '../components/Comment/Form';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Banner from '../components/Article/Banner';
import Container from '../components/Article/Container';
import ProfileBox from '../components/Article/ProfileBox';
import List from '../components/Comment/List';
import { useParams } from 'react-router';
import { useDeleteArticle, useFetchArticle } from '../hooks/article.hook';
import Layout from '@/components/common/Layout';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { data } = useFetchArticle(slug as string);
  const { mutate: deleteArticle } = useDeleteArticle(slug as string);

  const submitDeleteArticle = async () => {
    const result = confirm('정말로 게시글을 삭제하시겠습니까?');
    if (!result) return;
    await deleteArticle(slug as string);
  };

  const articleData = data?.data.article;

  if (!articleData) return <></>;
  return (
    <Layout>
      <div className="article-page">
        <Banner articleData={articleData} />

        <div className="container page">
          <Container articleData={articleData} />

          <hr />

          <ProfileBox articleData={articleData} deleteHandler={submitDeleteArticle} />

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <div>
                <CommentForm />
                <List />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetail;
