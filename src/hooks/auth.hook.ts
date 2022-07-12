import { useQuery, useMutation } from 'react-query';
import { createNewAccount, login } from '../networks/auth';

export const useCreateNewAccount = () => {
  return useMutation(createNewAccount, {
    onSuccess: data => {
      console.log(data);
    },
  });
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: data => {
      console.log(data);
    },
  });
};
