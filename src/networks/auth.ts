import { api, apiWithAuth } from '../config/api';
import { LoginData, NewAccountType, UpdateUserData, UserData } from '../types/auth';

export const createNewAccount = async (newAccountData: NewAccountType) => {
  const response = await api.post<UserData>(`/users`, newAccountData);
  return response;
};

export const login = async (loginData: LoginData) => {
  const response = await api.post<UserData>(`/users/login`, loginData);
  return response;
};

export const fetchCurentUser = async () => {
  const response = await apiWithAuth.get<UserData>(`/user`);
  return response;
};

export const updateCurrentUserData = async (updataUserData: UpdateUserData) => {
  const response = await apiWithAuth.put<UserData>(`/user`, updataUserData);
  return response;
};
