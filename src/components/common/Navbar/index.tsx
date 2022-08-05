import React, { FC } from 'react';
import { useFetchCurrentUser } from '@/hooks/auth.hook';
import MyLink from '../MyLink';
import NavBarSkeleton from '@/components/Skeletons/NavbarSkeleton';

const NavBar: FC = () => {
  const { data: loginUser, isFetching, isLoading } = useFetchCurrentUser();

  if (isFetching || isLoading) return <NavBarSkeleton />;
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
            {loginUser !== undefined ? (
              <>
                <li className="nav-item">
                  <MyLink className="nav-link" href="/create">
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
                    {loginUser?.username}
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
