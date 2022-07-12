import { useMutation, useQuery } from 'react-query';
import { createNewAccount, fetchCurentUser, login, updateCurrentUserData } from '../networks/auth';
import { useNavigate } from 'react-router';
import { UserData, UserInfo } from '../types/auth';
import { getTokenFromStorage, setTokenFromStorage } from '../commons/tokenStorage';

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
      const userData: UserData = data.data;
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
      const userData: UserInfo = data.data.user;
      return userData;
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
