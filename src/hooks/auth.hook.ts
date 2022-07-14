import { useMutation, useQuery } from 'react-query';
import { createNewAccount, fetchCurentUser, login, updateCurrentUserData } from '../networks/auth';
import { useNavigate } from 'react-router';
import { getTokenFromStorage, setTokenFromStorage } from '../commons/tokenStorage';
import { UserInfo } from '../types/auth';
import { apiWithAuth } from '../config/api';

export const useCreateNewAccount = () => {
  const navigate = useNavigate();

  return useMutation(createNewAccount, {
    onSuccess: data => {
      const userName = data.data.user.username;
      alert(`${userName}님의 회원가입이 성공적으로 진행되었습니다.`);
      navigate('/');
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation(login, {
    onSuccess: data => {
      const userData = data.data;
      apiWithAuth.defaults.headers['Authorization'] = `Token ${userData.user.token}`;
      setTokenFromStorage(userData.user.token);
      alert(`환영합니다 ${userData.user.username}님!`);
      navigate('/');
    },
  });
};

export const useFetchCurrentUser = () => {
  return useQuery('current-user', fetchCurentUser, {
    cacheTime: Infinity,
    staleTime: Infinity,
    select: data => {
      const userInfo: UserInfo = data.data.user;
      return userInfo;
    },
    retry: false,
  });
};

export const useFetchUserToken = () => {
  return useQuery('current-token', getTokenFromStorage, {
    cacheTime: Infinity,
  });
};

export const useUpdateCurrentUserData = () => {
  const navigate = useNavigate();

  return useMutation(updateCurrentUserData, {
    onSuccess: data => {
      console.log(data);
      alert('회원정보가 성공적으로 수정되었습니다.');
      navigate('/');
    },
  });
};

export const useGetLoginUserData = () => {
  return useQuery('login-user', fetchCurentUser, {
    cacheTime: Infinity,
    staleTime: Infinity,
    select: data => {
      const userInfo: UserInfo = data.data.user;
      return userInfo;
    },
  });
};
