import React, { FC } from 'react';
import './articleSkeleton.module.scss';

const ArticleSkeleton: FC = () => {
  return (
    <div id="skeleton-wrap">
      <div className="article-preview-skeleton">
        <div className="article-meta-skeleton">
          <div className="image skeletonItem" />
          <div className="profile skeletonItem" />
          <div className="favorite skeletonItem" />
        </div>
        <div className="preview-link-skeleton">
          <div className="title skeletonItem" />
          <div className="description skeletonItem" />
          <div className="readmore skeletonItem" />
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
