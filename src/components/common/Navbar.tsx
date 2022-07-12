import React, { FC } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useFetchUserToken, useGetCurrentUserData } from '../../hooks/auth.hook';
import MyLink from './MyLink';

const NavBar: FC = () => {
  const queryClient = useQueryClient();
  const { data: userToken } = useFetchUserToken();
  const userData = queryClient.getQueryData('login-user');

  console.log(userData);

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <MyLink className="navbar-brand" href="/">
            conduit
          </MyLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <MyLink className="nav-link active" href="/">
                Home
              </MyLink>
            </li>
            {userToken ? (
              <>
                <li className="nav-item">
                  <MyLink className="nav-link" href="/edit">
                    <i className="ion-compose" />
                    &nbsp;New Article
                  </MyLink>
                </li>
                <li className="nav-item">
                  <MyLink className="nav-link" href="/settings">
                    <i className="ion-gear-a" />
                    &nbsp;Settings
                  </MyLink>
                </li>
                <li className="nav-item">
                  <MyLink className="nav-link" href="/profile">
                    {userData!.username}
                  </MyLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <MyLink className="nav-link" href="/login">
                    Sign in
                  </MyLink>
                </li>
                <li className="nav-item">
                  <MyLink className="nav-link" href="/register">
                    Sign up
                  </MyLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
