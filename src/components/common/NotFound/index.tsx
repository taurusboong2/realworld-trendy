import React, { FC } from 'react';
import { useNotFoundRedirect } from '@/hooks/common.hook';
import './notFound.module.scss';

const NotFound: FC = () => {
  const { second } = useNotFoundRedirect();

  return (
    <>
      <div id="notFound-wrap">
        <div className="background" />
        <span>{second}초 뒤 홈페이지로 이동합니다.</span>
      </div>
    </>
  );
};

export default NotFound;
