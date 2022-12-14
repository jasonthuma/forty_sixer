import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  IMountain,
  IMountainContext,
  IMountainState,
  MountainAction,
  MountainActionType,
} from "../@types/mountain";
import mountainService from "./mountainService";

const initialState: IMountainState = {
  mountains: [],
  loadingMountains: false,
  errorMountains: "",
};

const initialContext: IMountainContext = {
  state: initialState,
  actions: {
    mountainUserLogout: () => undefined,
    fetchMountainData: () => undefined,
  },
};

export const mountainReducer = (
  state: IMountainState,
  action: MountainAction
): IMountainState => {
  switch (action.type) {
    case MountainActionType.INIT_FETCH_MOUNTAIN_DATA:
      return { ...state, loadingMountains: true };
    case MountainActionType.FETCH_MOUNTAIN_DATA_SUCCESSFUL:
      return {
        ...state,
        mountains: action.payload?.mountains!,
        loadingMountains: false,
      };
    case MountainActionType.FETCH_MOUNTAIN_DATA_FAILED:
      return {
        ...state,
        mountains: [],
        errorMountains: action.payload?.error as string,
      };
    case MountainActionType.USER_LOGGED_OUT:
      return { ...state, mountains: [] };
    default:
      return state;
  }
};

const MountainContext = createContext<IMountainContext>(initialContext);

const MountainProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mountainReducer, initialState);

  const fetchMountainData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token") || "";
      if (token) {
        dispatch({ type: MountainActionType.INIT_FETCH_MOUNTAIN_DATA });
        const mountains = await mountainService.getMountains(token);
        if (mountains) {
          dispatch({
            type: MountainActionType.FETCH_MOUNTAIN_DATA_SUCCESSFUL,
            payload: {
              mountains: mountains as IMountain[],
            },
          });
        } else {
          dispatch({
            type: MountainActionType.FETCH_MOUNTAIN_DATA_FAILED,
            payload: { error: "Failed fetching mountain data" },
          });
        }
      }
    } catch (error: Error | any) {
      dispatch({
        type: MountainActionType.FETCH_MOUNTAIN_DATA_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  useEffect(() => {
    fetchMountainData();
  }, [fetchMountainData]);

  const mountainUserLogout = useCallback(() => {
    dispatch({ type: MountainActionType.USER_LOGGED_OUT });
  }, []);

  const value = useMemo(
    () => ({ state, actions: { mountainUserLogout, fetchMountainData } }),
    [state, mountainUserLogout, fetchMountainData]
  );

  return (
    <MountainContext.Provider value={value}>
      {children}
    </MountainContext.Provider>
  );
};

export const useMountainState = () => {
  const { state } = useContext(MountainContext);
  return state;
};

export const useMountainActions = () => {
  const { actions } = useContext(MountainContext);
  return actions;
};

export default MountainProvider;
