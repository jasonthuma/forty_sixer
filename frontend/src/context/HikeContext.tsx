import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
  useMemo,
} from "react";
import {
  HikeAction,
  HikeActionType,
  IHike,
  IHikeContext,
  IHikeState,
  NewHike,
} from "../@types/hike";
import hikeService from "./hikeService";

const initialState: IHikeState = {
  hikes: [],
  loadingHikes: false,
  errorHikes: "",
};

const initialContext: IHikeContext = {
  state: initialState,
  actions: {
    create: () => undefined,
    fetchHikeData: () => undefined,
    // update: () => undefined,
    // deleteHike: () => undefined,
  },
};

export const hikeReducer = (
  state: IHikeState,
  action: HikeAction
): IHikeState => {
  switch (action.type) {
    case HikeActionType.INIT_FETCH_HIKE_DATA:
      return { ...state, loadingHikes: true };
    case HikeActionType.FETCH_HIKE_DATA_SUCCESSFUL:
      return { ...state, hikes: action.payload?.hikes!, loadingHikes: false };
    case HikeActionType.FETCH_HIKE_DATA_FAILED:
      return { ...state, errorHikes: action.payload?.error as string };
    case HikeActionType.INIT_CREATE:
      return { ...state, loadingHikes: true };
    case HikeActionType.CREATE_SUCCESSFUL:
      return {
        ...state,
        loadingHikes: false,
        hikes: state!.hikes.concat(action.payload?.hike!),
      };

    case HikeActionType.CREATE_FAILED:
      return {
        ...state,
        errorHikes: action.payload?.error as string,
      };
    case HikeActionType.INIT_UPDATE:
      return { ...state, loadingHikes: true };
    case HikeActionType.UPDATE_SUCCESSFUL:
      const updatedHike = action.payload?.hike;
      const updatedHikes = state.hikes.map((hike) => {
        if (updatedHike && hike.id === updatedHike.id) {
          return updatedHike;
        }
        return hike;
      });

      return {
        ...state,
        hikes: updatedHikes,
        loadingHikes: false,
      };
    case HikeActionType.UPDATE_FAILED:
      return { ...state, errorHikes: action.payload?.error as string };
    case HikeActionType.INIT_DELETE:
      return { ...state, loadingHikes: true };
    case HikeActionType.DELETE_SUCCESSFUL:
      return {
        ...state,
        hikes: state.hikes.filter(
          (hike) => hike.id !== action.payload?.hike?.id
        ),
      };
    case HikeActionType.DELETE_FAILED:
      return { ...state, errorHikes: action.payload?.error as string };
    default:
      return state;
  }
};

const HikeContext = createContext<IHikeContext>(initialContext);

const HikeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(hikeReducer, initialState);

  const fetchHikeData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch({ type: HikeActionType.INIT_FETCH_HIKE_DATA });
        const hikes = await hikeService.getHikes();
        if (hikes) {
          dispatch({
            type: HikeActionType.FETCH_HIKE_DATA_SUCCESSFUL,
            payload: {
              hikes: hikes as IHike[],
            },
          });
        } else {
          dispatch({
            type: HikeActionType.FETCH_HIKE_DATA_FAILED,
          });
        }
      }
    } catch (error: Error | any) {
      dispatch({
        type: HikeActionType.FETCH_HIKE_DATA_FAILED,
      });
    }
  }, []);

  const create = useCallback(async (newHike: NewHike) => {
    try {
      dispatch({ type: HikeActionType.INIT_CREATE });
      const response = await hikeService.create(newHike);
      if (response) {
        const { hike } = response;
        dispatch({ type: HikeActionType.CREATE_SUCCESSFUL, payload: { hike } });
      }
    } catch (error: Error | any) {
      dispatch({
        type: HikeActionType.CREATE_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  const value = useMemo(
    () => ({ state, actions: { create, fetchHikeData } }),
    [state, create, fetchHikeData]
  );

  return <HikeContext.Provider value={value}>{children}</HikeContext.Provider>;
};

export const useHikeState = () => {
  const { state } = useContext(HikeContext);
  return state;
};

export const useHikeActions = () => {
  const { actions } = useContext(HikeContext);
  return actions;
};

export default HikeProvider;
