import React, { FC } from 'react';
import MyLink from './MyLink';

type Props = {
  name?: string | number | string[];
};

const NavBar: FC<Props> = () => {
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
            <li className="nav-item">
              <MyLink className="nav-link" href="">
                <i className="ion-compose" />
                &nbsp;New Article
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink className="nav-link" href="">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink className="nav-link" href="">
                Sign in
              </MyLink>
            </li>
            <li className="nav-item">
              <MyLink className="nav-link" href="">
                Sign up
              </MyLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
