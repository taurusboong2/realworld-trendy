import React, { FC, useEffect } from 'react';
import { useFetchCurrentUser } from '../../hooks/auth.hook';
import { useNavigate } from 'react-router';

type Props = {
  children: React.ReactNode;
};

const AuthCheck: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { data: user } = useFetchCurrentUser();

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요한 페이지입니다!');
      navigate('/');
    }
  }, []);

  return <>{children}</>;
};

export default AuthCheck;
