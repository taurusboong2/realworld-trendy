import React, { FC } from 'react';
import { ArticleType } from '../../types/article';

type Props = {
  articleData: ArticleType;
};

const Container: FC<Props> = ({ articleData }) => {
  return (
    <>
      <div className="row article-content">
        <div className="col-md-12">
          <p>{articleData.description}</p>
          <p>body: {articleData.body}</p>
          <ul className="tag-list">태그리스트 자리.</ul>
        </div>
      </div>
    </>
  );
};

export default Container;
