import React, { FC } from 'react';
import { ArticleType } from '@/types/article';

type Props = {
  articleData: ArticleType;
};

const Container: FC<Props> = ({ articleData }) => {
  return (
    <>
      <div className="row article-content">
        <div className="col-md-12">
          <p>{articleData.body}</p>
          <hr />
          <span className="description">description</span>
          <p className="article-detail-description">{articleData.description}</p>
          <ul className="tag-list">
            {articleData.tagList.map(tag => (
              <li key={tag} className="tag-default tag-pill tag-outline">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Container;
