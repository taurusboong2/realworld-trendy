import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import './reset.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default hot(App);
