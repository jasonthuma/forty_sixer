import axios from "axios";
import { LoginUser, NewUser } from "../@types/user";

const login = async (userData: LoginUser) => {
  const response = await axios.post("/users/login", userData);
  return response.data;
};

const register = async (newUser: NewUser) => {
  const response = await axios.post("/users/register", newUser);
  return response.data;
};

const getUserData = async (token: string) => {
  const response = await axios.get(`/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const forgotPassword = async (email: string) => {
  let redirectUrl =
    "http://fortysixer2-env.eba-xitaunry.us-east-1.elasticbeanstalk.com/resetPassword";

  const body = { email, redirectUrl };
  const response = await axios.post("/users/forgotPassword", body);
  return response.data;
};

const resetPassword = async (
  newPassword: string,
  userId: string,
  resetString: string
) => {
  const body = { userId, resetString, newPassword };
  const response = await axios.post("/users/resetPassword", body);
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
