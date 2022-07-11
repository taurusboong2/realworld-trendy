import { useQuery, useMutation } from 'react-query';
import { createNewAccount } from '../networks/auth';

export const useCreateNewAccount = () => {
  return useMutation(createNewAccount);
};
