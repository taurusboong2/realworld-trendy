import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import './reset.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/common/Layout';
import Register from './pages/register';

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
      <Layout>
        <head>
          <title>RealWorld | TaurusBoong</title>
          <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        </head>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default hot(App);
