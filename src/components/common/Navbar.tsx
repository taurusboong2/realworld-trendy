import React, { FC } from 'react';
import { getTokenFromStorage } from '../../commons/tokenStorage';
import MyLink from './MyLink';

type Props = {
  name?: string | number | string[];
};

const NavBar: FC<Props> = () => {
  const userToken = getTokenFromStorage();
  console.log(`토큰:`, userToken);

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <MyLink className="navbar-brand" href="index.html">
            conduit
          </MyLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <MyLink className="nav-link active" href="">
                Home
              </MyLink>
            </li>
            {userToken ? (
              <>
                <li className="nav-item">
                  <MyLink className="nav-link" href="">
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
