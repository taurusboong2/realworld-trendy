import React, { FC } from 'react';
import Sidebar from './SideBar';

const Container: FC = () => {
  return (
    <>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Container;
