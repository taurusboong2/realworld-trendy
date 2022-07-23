import React, { FC, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import './reset.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import Layout from './components/common/Layout';
import Register from './pages/register';
import Login from './pages/login';
import Settings from './pages/settings';
import Profile from './pages/profile';
import CreatePage from './pages/create';
import ArticleDetail from './pages/articleDetail';
import EditPage from './pages/edit';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 60000,
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
                <Route path="/create" element={<CreatePage />} />
                <Route path="/article-detail/:slug" element={<ArticleDetail />} />
                <Route path="/edit/:slug" element={<EditPage />} />
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
