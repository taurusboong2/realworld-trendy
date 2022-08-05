import React, { FC } from 'react';
import { useNotFoundRedirect } from '@/hooks/common.hook';
import styles from './notFound.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NotFound: FC = () => {
  const { second } = useNotFoundRedirect();

  return (
    <>
      <div id={cx('notFound-wrap')}>
        <div className={cx('background')} />
        <span>{second}초 뒤 홈페이지로 이동합니다.</span>
      </div>
    </>
  );
};

export default NotFound;
