import React from 'react';

import styles from './UserInfoSkeleton.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
const UserInfoSkeleton = () => {
  return (
    <>
      <div className={cx('container')} />
    </>
  );
};

export default UserInfoSkeleton;
