import axios from "axios";
import { LoginUser, NewUser } from "../@types/user";

const authApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (userData: LoginUser) => {
  const response = await authApi.post("/users/login", userData);
  return response.data;
};

const register = async (newUser: NewUser) => {
  const response = await authApi.post("/users/register", newUser);
  return response.data;
};

const getUserData = async (token: string) => {
  const response = await authApi.get(`/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const forgotPassword = async (email: string) => {
  let redirectUrl = "http://localhost:3000/resetPassword";

  const body = { email, redirectUrl };
  const response = await authApi.post("/users/forgotPassword", body);
  return response.data;
};

const resetPassword = async (
  newPassword: string,
  userId: string,
  resetString: string
) => {
  const body = { userId, resetString, newPassword };
  const response = await authApi.post("/users/resetPassword", body);
  return response.data;
};

const authService = {
  register,
  login,
  getUserData,
  forgotPassword,
  resetPassword,
};

export default authService;
