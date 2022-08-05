import React, { FC } from 'react';
import styles from './UserInfoSkeleton.module.scss';

const UserInfoSkeleton: FC = () => {
  return (
    <div id={styles.skeletonWrap}>
      <div className={styles.userInfoWrap}>
        <div className={`${styles.userImage} ${styles.skeletonItem}`} />
        <div className={`${styles.userName} ${styles.skeletonItem}`} />
        <div className={`${styles.userBio} ${styles.skeletonItem}`} />
        <div className={`${styles.followBtn} ${styles.skeletonItem}`} />
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
