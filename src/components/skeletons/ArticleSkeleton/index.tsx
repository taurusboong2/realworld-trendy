import React from 'react';

import styles from './ArticleSkeleton.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
const ArticleSkeleton = () => {
  return (
    <>
      <div className={cx('container')} />
    </>
  );
};

export default ArticleSkeleton;
