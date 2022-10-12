export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface NewUser {
  email: string;
  password: string;
  username: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IAuthContext {
  state: IAuthState;
  actions: IAuthAction;
}

export interface IAuthState {
  user: IUser | null | undefined;
  loading: boolean;
  error: string;
  message: string;
}

export interface IAuthAction {
  login: (user: LoginUser) => void;
  register: (newUser: NewUser) => void;
  logout: () => void;
  forgotPassword: (email: string) => void;
  resetPassword: (
    newPassword: string,
    userId: string,
    resetString: string
  ) => void;
  resetAuthResponse: () => void;
}

export enum AuthActionType {
  INIT_LOGIN = "INIT_LOGIN",
  LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL",
  LOGIN_FAILED = "LOGIN_FAILED",
  INIT_REGISTER = "INIT_REGISTER",
  REGISTER_SUCCESSFUL = "REGISTER_SUCCESSFUL",
  REGISTER_FAILED = "REGISTER_FAILED",
  INIT_FETCH_USER_DATA = "INIT_FETCH_USER_DATA",
  FETCH_USER_DATA_SUCCESSFUL = "FETCH_USER_DATA_SUCCESSFUL",
  FETCH_USER_DATA_FAILED = "FETCH_USER_DATA_FAILED",
  LOGOUT = "LOGOUT",
  INIT_FORGOT_PASSWORD = "INIT_FORGOT_PASSWORD",
  FORGOT_PASSWORD_SUCCESSFUL = "FORGOT_PASSWORD_SUCCESSFUL",
  FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED",
  INIT_RESET_PASSWORD = "INIT_RESET_PASSWORD",
  RESET_PASSWORD_SUCCESSFUL = "RESET_PASSWORD_SUCCESSFUL",
  RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED",
  RESET_AUTH_RESPONSE = "RESET_AUTH_RESPONSE",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: {
    user?: IUser;
    error?: string;
    message?: string;
  };
}
