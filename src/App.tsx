import React, { FC, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import './reset.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import Layout from './components/common/Layout';
import Register from './pages/register';
import Login from './pages/login';
import Settings from './pages/settings';
import Profile from './pages/profile';
import Edit from './pages/edit';

const mutationCache = new MutationCache();
const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
    </div>
  );
};

const App: FC = () => {
  return (
    <>
      <head>
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
      </head>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Suspense fallback={<></>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
};

export default hot(App);
