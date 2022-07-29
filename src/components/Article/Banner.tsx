import React, { FC } from 'react';
import { ArticleType } from '@/types/article';
import MyLink from '@/components/common/MyLink';

type Props = {
  articleData: ArticleType;
};

const Banner: FC<Props> = ({ articleData }) => {
  return (
    <>
      <div className="banner">
        <div className="container">
          <h1>{articleData.title}</h1>

          <div className="article-meta">
            <MyLink href="">
              <img src={articleData.author.image} />
            </MyLink>
            <div className="info">
              <MyLink href="" className="author">
                {articleData.author.username}
              </MyLink>
              <span className="date">{new Date(articleData.createdAt).toDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
