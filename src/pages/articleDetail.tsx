import React from 'react';
import { useParams } from 'react-router';

const ArticleDetail = () => {
  const { slug } = useParams();
  console.log(`slug :`, slug);

  return (
    <>
      <h1>articleDetail page</h1>
    </>
  );
};

export default ArticleDetail;
