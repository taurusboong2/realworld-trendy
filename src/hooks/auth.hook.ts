import axios from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createNewAccount, fetchCurentUser, login, updateCurrentUserData } from '../networks/auth';
import { useNavigate } from 'react-router';
import { removeTokenFromStorage, setTokenFromStorage } from '../commons/tokenStorage';
import { apiWithAuth } from '../config/api';
import { createToast } from '@/components/common/Toast';
import { ErrorCode } from '@/constants/errorCodes';
import * as messages from '@/constants/messages';
import * as Sentry from '@sentry/react';

export const useCreateNewAccount = () => {
  const navigate = useNavigate();

  return useMutation(createNewAccount, {
    onSuccess: data => {
      const userName = data.data.user.username;
      alert(`${userName}님의 회원가입이 성공적으로 진행되었습니다.`);
      navigate('/');
    },
    onError: error => {
      if (!axios.isAxiosError(error)) {
        throw error;
      }
      const errorCode: number = error?.request.status;
      if (errorCode === ErrorCode.FailValidation) {
        createToast({
          message: messages.UNIQUE_idEmail,
          type: 'error',
        });
      }
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: async data => {
      const userData = data.data;
      createToast({
        message: messages.AUTH_welcomeMessage(userData.user.username),
        type: 'info',
      });
      apiWithAuth.defaults.headers['Authorization'] = `Token ${userData.user.token}`;
      setTokenFromStorage(userData.user.token);
      navigate('/');
      await queryClient.invalidateQueries(['current-user']);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const currentUserLogout = () => {
    const ask = confirm('정말로 로그아웃을 하시겠습니까?');
    if (!ask) return;
    if (ask) {
      removeTokenFromStorage();
      navigate('/');
      createToast({
        message: messages.AUTH_logoutDone,
        type: 'warning',
      });
      queryClient.setQueryData('current-user', undefined);
      queryClient.removeQueries('articles');
    }
  };

  return { currentUserLogout };
};

export const useFetchCurrentUser = () => {
  return useQuery('current-user', fetchCurentUser, {
    staleTime: Infinity,
    cacheTime: 60000,
    retry: false,
    refetchOnWindowFocus: false,
    select: data => {
      const userInfo = data.data.user;
      return userInfo;
    },
    onSuccess: data => {
      Sentry.setUser({
        email: data.email,
        username: data.username,
      });
    },
  });
};

export const useUpdateCurrentUserData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(updateCurrentUserData, {
    onSuccess: async data => {
      createToast({
        message: messages.AUTH_changedInfo,
        type: 'info',
      });
      navigate('/');
      removeTokenFromStorage();
      setTokenFromStorage(`${data.data.user.token}`);
      apiWithAuth.defaults.headers['Authorization'] = `Token ${data.data.user.token}`;
      queryClient.setQueryData('current-user', data);
      queryClient.invalidateQueries(['articles']);
    },
  });
};

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const { isFetched, data: user } = useFetchCurrentUser();

  useEffect(() => {
    if (!isFetched) return;
    if (!user) {
      createToast({
        message: messages.AUTH_required,
        type: 'info',
      });
      navigate('/');
    }
  }, [isFetched, user]);
};
