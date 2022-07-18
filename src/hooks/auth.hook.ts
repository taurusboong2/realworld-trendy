import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createNewAccount, fetchCurentUser, login, updateCurrentUserData } from '../networks/auth';
import { useNavigate } from 'react-router';
import { getTokenFromStorage, removeTokenFromStorage, setTokenFromStorage } from '../commons/tokenStorage';
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
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: async data => {
      const userData = data.data;
      apiWithAuth.defaults.headers['Authorization'] = `Token ${userData.user.token}`;
      setTokenFromStorage(userData.user.token);
      alert(`환영합니다 ${userData.user.username}님!`);
      navigate('/');
      await queryClient.invalidateQueries(['current-user']);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const currentUserLogout = async () => {
    removeTokenFromStorage();
    alert('로그아웃이 성공적으로 진행되었습니다.');
    navigate('/');
    await queryClient.setQueryData(['current-user'], undefined);
  };

  return { currentUserLogout };
};

export const useFetchCurrentUser = () => {
  return useQuery(['current-user'], fetchCurentUser, {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ['data', 'refetch', 'remove', 'error'],
    select: data => {
      const userInfo = data.data.user;
      return userInfo;
    },
  });
};

export const useFetchUserToken = () => {
  return useQuery(['current-token'], getTokenFromStorage, {
    cacheTime: Infinity,
  });
};

export const useUpdateCurrentUserData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(updateCurrentUserData, {
    onSuccess: async data => {
      alert('회원정보가 성공적으로 수정되었습니다.');
      navigate('/');
      removeTokenFromStorage();
      queryClient.setQueryData(['current-user'], data);
      setTokenFromStorage(`${data.data.user.token}`);
    },
  });
};
