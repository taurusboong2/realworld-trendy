import { useQuery, useMutation } from 'react-query';
import { createNewAccount, login } from '../networks/auth';

export const useCreateNewAccount = () => {
  return useMutation(createNewAccount, {});
};

export const useLogin = () => {
  return useMutation(login);
};
