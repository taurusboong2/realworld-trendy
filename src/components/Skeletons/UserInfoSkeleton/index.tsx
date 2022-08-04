import React, { FC } from 'react';
import './UserInfoSkeleton.module.scss';

const UserInfoSkeleton: FC = () => {
  return (
    <div id="skeleton-wrap">
      <div className="user-info-wrap">
        <div className="user-image skeletonItem" />
        <div className="user-name skeletonItem" />
        <div className="user-bio skeletonItem" />
        <div className="followBtn skeletonItem" />
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
