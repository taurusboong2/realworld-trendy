import React, { FC } from 'react';
import styles from './articleSkeleton.module.scss';

const ArticleSkeleton: FC = () => {
  return (
    <div id="skeleton-wrap">
      <div className={styles.articlePreviewSkeleton}>
        <div className={styles.articleMetaSkeleton}>
          <div className={`${styles.image} ${styles.skeletonItem}`} />
          <div className={`${styles.profile} ${styles.skeletonItem}`} />
          <div className={`${styles.favorite} ${styles.skeletonItem}`} />
        </div>
        <div className={styles.previewLinkSkeleton}>
          <div className={`${styles.title} ${styles.skeletonItem}`} />
          <div className={`${styles.description} ${styles.skeletonItem}`} />
          <div className={`${styles.readmore} ${styles.skeletonItem}`} />
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
