import React, { FC,Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import './reset.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from './pages/Home';
import Layout from './components/common/Layout';
import Register from './pages/register';

const queryClient = new QueryClient()

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
    </div>
  );
};

const App:FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <head>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default hot(App);
