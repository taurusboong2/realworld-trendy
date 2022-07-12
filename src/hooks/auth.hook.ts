import { useQuery, useMutation } from 'react-query';
import { createNewAccount, login } from '../networks/auth';
import { useNavigate } from 'react-router';
import { UserData } from '../types/auth';

export const useCreateNewAccount = () => {
  const navigate = useNavigate();

  return useMutation(createNewAccount, {
    onSuccess: data => {
      console.log(data);
      alert('회원가입이 성공적으로 진행되었습니다.');
      navigate('/');
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation(login, {
    onSuccess: data => {
      const userData: UserData = data.data;
      console.log(userData);
      alert(`환영합니다 ${userData.user.username}님!`);
      navigate('/');
    },
  });
};
