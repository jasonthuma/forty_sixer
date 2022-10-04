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

const getUserData = async () => {
  const token = localStorage.getItem("token") || "";
  const response = await authApi.get(`/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const authService = {
  register,
  login,
  getUserData,
};

export default authService;
