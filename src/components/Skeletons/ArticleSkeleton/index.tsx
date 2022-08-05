import React, { FC } from 'react';
import styles from './articleSkeleton.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);
const ArticleSkeleton: FC = () => {
  return (
    <div id="skeleton-wrap">
      <div className={cx('articlePreviewSkeleton')}>
        <div className={cx('articleMetaSkeleton')}>
          <div className={cx('image', 'skeletonItem')} />
          <div className={cx('profile', 'skeletonItem')} />
          <div className={cx('favorite', 'skeletonItem')} />
        </div>
        <div className={cx('previewLinkSkeleton')}>
          <div className={cx('title', 'skeletonItem')} />
          <div className={cx('description', 'skeletonItem')} />
          <div className={cx('readmore', 'skeletonItem')} />
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
