import React, { FC, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Settings from './pages/settings';
import Profile from './pages/profile';
import CreatePage from './pages/create';
import ArticleDetail from './pages/articleDetail';
import EditPage from './pages/edit';
import Notice from './pages/notice';
import NotFound from './components/common/NotFound';

import './styles/_base.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 60000,
    },
  },
});

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
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
              <Route path="/notice/:slug" element={<Notice />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
};

export default hot(App);
