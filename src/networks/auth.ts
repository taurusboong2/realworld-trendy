import { Certificate } from 'crypto';
import { api } from '../config/api';
import { LoginData, NewAccountType } from '../types/auth';

export const createNewAccount = (newAccountData: NewAccountType) => {
  const response = api.post(`/users`, newAccountData);
  return response;
};

export const login = (loginData: LoginData) => {
  const response = api.post(`/users/login`, loginData);
  return response;
};
