import React from 'react';
import classNames from 'classnames/bind';
import styles from './navBarSkeleton.module.scss';

const cx = classNames.bind(styles);

const NavBarSkeleton = () => {
  return (
    <div id={styles.skeletonWrap}>
      <div>
        <div className={cx('logo', 'skeletonItem')} />
        <div className={cx('menus')}>
          <div className={cx('home', 'skeletonItem')} />
          <div className={cx('new', 'skeletonItem')} />
          <div className={cx('settings', 'skeletonItem')} />
          <div className={cx('profile', 'skeletonItem')} />
        </div>
      </div>
    </div>
  );
};

export default NavBarSkeleton;
