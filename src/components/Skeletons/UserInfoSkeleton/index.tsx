import React, { FC } from 'react';
import styles from './UserInfoSkeleton.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const UserInfoSkeleton: FC = () => {
  return (
    <div id={cx('skeletonWrap')}>
      <div className={cx('userInfoWrap')}>
        <div className={cx('userImage', 'skeletonItem')} />
        <div className={cx('userName', 'skeletonItem')} />
        <div className={cx('userBio', 'skeletonItem')} />
        <div className={cx('followBtn', 'skeletonItem')} />
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
