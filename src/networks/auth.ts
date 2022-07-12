import { api, apiWithAuth } from '../config/api';
import { LoginData, NewAccountType } from '../types/auth';

export const createNewAccount = (newAccountData: NewAccountType) => {
  const response = api.post(`/users`, newAccountData);
  return response;
};

export const login = (loginData: LoginData) => {
  const response = api.post(`/users/login`, loginData);
  return response;
};

export const fetchCurentUser = () => {
  const response = apiWithAuth.get(`/user`);
  return response;
};
