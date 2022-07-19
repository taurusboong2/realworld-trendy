import React, { FC, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';

type Props = {
  children: React.ReactNode;
};

const AuthCheck: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  useEffect(() => {
    (async () => {
      const user = await queryclient.getQueryData('current-user');
      if (!user) {
        alert('로그인이 필요한 페이지입니다!');
        navigate('/');
      }
    })();
  }, []);

  return <>{children}</>;
};

export default AuthCheck;
