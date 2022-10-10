import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import authService from "./authService";
import {
  IAuthState,
  IAuthContext,
  AuthAction,
  AuthActionType,
  LoginUser,
  NewUser,
} from "../@types/user";

const initialState: IAuthState = {
  user: null,
  loading: false,
  error: "",
  message: "",
};

const initialContext: IAuthContext = {
  state: initialState,
  actions: {
    login: () => undefined,
    register: () => undefined,
    logout: () => undefined,
    forgotPassword: () => undefined,
    resetPassword: () => undefined,
  },
};

export const authReducer = (
  state: IAuthState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionType.INIT_FETCH_USER_DATA:
      return { ...state, loading: true };
    case AuthActionType.FETCH_USER_DATA_SUCCESSFUL:
      return { ...state, loading: false, user: action.payload?.user };
    case AuthActionType.FETCH_USER_DATA_FAILED:
      return { ...state, loading: false, user: null };
    case AuthActionType.INIT_LOGIN:
      return { ...state, loading: true };
    case AuthActionType.LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: action.payload?.user,
        loading: false,
        error: "",
      };
    case AuthActionType.LOGIN_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload?.error as string,
      };
    case AuthActionType.INIT_REGISTER:
      return { ...state, loading: true };
    case AuthActionType.REGISTER_SUCCESSFUL:
      return {
        ...state,
        user: action.payload?.user,
        loading: false,
        error: "",
      };
    case AuthActionType.REGISTER_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload?.error as string,
      };
    case AuthActionType.LOGOUT:
      return { ...state, user: null };
    case AuthActionType.INIT_FORGOT_PASSWORD:
      return { ...state, loading: true };
    case AuthActionType.FORGOT_PASSWORD_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        message: action.payload?.message as string,
      };
    case AuthActionType.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload?.error as string,
      };
    case AuthActionType.INIT_RESET_PASSWORD:
      return { ...state, loading: true };
    case AuthActionType.RESET_PASSWORD_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        message: action.payload?.message as string,
      };
    case AuthActionType.RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload?.error as string,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        if (token) {
          dispatch({ type: AuthActionType.INIT_FETCH_USER_DATA });
          const user = await authService.getUserData(token);
          if (user) {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_SUCCESSFUL,
              payload: { user },
            });
          } else {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_FAILED,
            });
          }
        }
      } catch (error: Error | any) {
        dispatch({
          type: AuthActionType.FETCH_USER_DATA_FAILED,
        });
      }
    };

    fetchUserData();
  }, []);

  const login = useCallback(async (user: LoginUser) => {
    try {
      dispatch({ type: AuthActionType.INIT_LOGIN });
      const loginResponse = await authService.login(user);
      if (loginResponse) {
        const { user, token } = loginResponse;
        localStorage.setItem("token", token);
        dispatch({ type: AuthActionType.LOGIN_SUCCESSFUL, payload: { user } });
      } else {
        dispatch({
          type: AuthActionType.LOGIN_FAILED,
          payload: { error: loginResponse },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.LOGIN_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  const register = useCallback(async (newUser: NewUser) => {
    try {
      dispatch({ type: AuthActionType.INIT_REGISTER });
      const registerResponse = await authService.register(newUser);
      if (registerResponse) {
        const { user, token } = registerResponse;
        localStorage.setItem("token", token);
        dispatch({
          type: AuthActionType.REGISTER_SUCCESSFUL,
          payload: { user },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.REGISTER_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: AuthActionType.LOGOUT });
    localStorage.removeItem("token");
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      dispatch({ type: AuthActionType.INIT_FORGOT_PASSWORD });
      const forgotResponse = await authService.forgotPassword(email);
      console.log(forgotResponse);
      if (forgotResponse) {
        const { message } = forgotResponse;
        if (message) {
          dispatch({
            type: AuthActionType.FORGOT_PASSWORD_SUCCESSFUL,
            payload: { message },
          });
        }
      } else {
        dispatch({
          type: AuthActionType.FORGOT_PASSWORD_FAILED,
          payload: { error: "Failed to send forgot password link" },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.FORGOT_PASSWORD_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  const resetPassword = useCallback(
    async (newPassword: string, userId: string, resetString: string) => {
      try {
        dispatch({ type: AuthActionType.INIT_RESET_PASSWORD });
        const resetResponse = await authService.resetPassword(
          newPassword,
          userId,
          resetString
        );
        console.log(resetResponse);
        if (resetResponse) {
          const { message } = resetResponse;
          if (message) {
            dispatch({
              type: AuthActionType.RESET_PASSWORD_SUCCESSFUL,
              payload: { message },
            });
          }
        } else {
          dispatch({
            type: AuthActionType.RESET_PASSWORD_FAILED,
            payload: { error: "Failed to reset password, try again" },
          });
        }
      } catch (error: Error | any) {
        dispatch({
          type: AuthActionType.RESET_PASSWORD_FAILED,
          payload: { error: error.response.data.message },
        });
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      state,
      actions: { login, register, logout, forgotPassword, resetPassword },
    }),
    [login, register, logout, forgotPassword, resetPassword, state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return state;
};

export const useAuthActions = () => {
  const { actions } = useContext(AuthContext);
  return actions;
};

export default AuthProvider;
