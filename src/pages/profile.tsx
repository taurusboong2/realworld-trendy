import React from 'react';
import { useFetchCurrentUser } from '../hooks/auth.hook';
import UserInfo from '../components/Profile/UserInfo';

const Profile = () => {
  const { data: user } = useFetchCurrentUser();

  return (
    <>
      <div className="profile-page">
        <UserInfo userName={user?.username} userBio={user?.bio} userImage={user?.image || undefined} />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
