import { api, apiWithAuth } from '../config/api';
import { LoginData, NewAccountType, UpdateUserData, UserData, UserInfo } from '../types/auth';

export const createNewAccount = (newAccountData: NewAccountType) => {
  const response = api.post<UserData>(`/users`, newAccountData);
  return response;
};

export const login = (loginData: LoginData) => {
  const response = api.post<UserData>(`/users/login`, loginData);
  return response;
};

export const fetchCurentUser = () => {
  const response = apiWithAuth.get<UserInfo>(`/user`);
  return response;
};

export const updateCurrentUserData = (updataUserData: UpdateUserData) => {
  const response = apiWithAuth.put<UserData>(`/user`, updataUserData);
  return response;
};
