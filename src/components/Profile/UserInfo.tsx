import React, { FC } from 'react';
import { useFetchCurrentUser } from '@/hooks/auth.hook';
import UserInfoSkeleton from '../Skeletons/UserInfoSkeleton';

const UserInfo: FC = () => {
  const { data: user } = useFetchCurrentUser();

  if (!user) return <UserInfoSkeleton />;
  const { username, bio, image } = user;
  return (
    <>
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={image} className="user-img" />
              <h4>{username}</h4>
              <p>{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
