import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import {
  HikeAction,
  HikeActionType,
  IHike,
  IHikeContext,
  IHikeState,
  NewHike,
  Status,
  UpdateHike,
} from "../@types/hike";
import hikeService from "./hikeService";

const initialState: IHikeState = {
  hikes: [],
  status: Status.IDLE,
  loadingHikes: false,
  errorHikes: "",
};

const initialContext: IHikeContext = {
  state: initialState,
  actions: {
    create: () => undefined,
    reset: () => undefined,
    update: () => undefined,
    deleteHike: () => undefined,
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
      return {
        ...state,
        hikes: action.payload?.hikes!,
        loadingHikes: false,
      };
    case HikeActionType.FETCH_HIKE_DATA_FAILED:
      return {
        ...state,
        errorHikes: action.payload?.error as string,
        loadingHikes: false,
      };
    case HikeActionType.INIT_CREATE:
      return { ...state, status: Status.PENDING };
    case HikeActionType.CREATE_SUCCESSFUL:
      return {
        ...state,
        status: Status.SUCCESS,
        hikes: state.hikes.concat(action.payload?.hike!),
      };

    case HikeActionType.CREATE_FAILED:
      return {
        ...state,
        errorHikes: action.payload?.error as string,
        status: Status.FAILED,
      };
    case HikeActionType.INIT_UPDATE:
      return { ...state, status: Status.PENDING };
    case HikeActionType.UPDATE_SUCCESSFUL:
      const updatedHike = action.payload?.hike!;
      const updatedHikes = state.hikes.map((hike) => {
        if (updatedHike && hike.id === updatedHike.id) {
          return updatedHike;
        }
        return hike;
      });

      return {
        ...state,
        hikes: updatedHikes,
        status: Status.SUCCESS,
      };
    case HikeActionType.UPDATE_FAILED:
      return {
        ...state,
        errorHikes: action.payload?.error as string,
        status: Status.FAILED,
      };
    case HikeActionType.INIT_DELETE:
      return { ...state };
    case HikeActionType.DELETE_SUCCESSFUL:
      return {
        ...state,
        hikes: state.hikes.filter((hike) => hike.id !== action.payload?.hikeId),
      };
    case HikeActionType.DELETE_FAILED:
      return {
        ...state,
        errorHikes: action.payload?.error as string,
      };
    case HikeActionType.RESET_HIKE_RESPONSE:
      return {
        ...state,
        errorHikes: "",
        status: Status.IDLE,
        loadingHikes: false,
      };
    default:
      return state;
  }
};

const HikeContext = createContext<IHikeContext>(initialContext);

const HikeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(hikeReducer, initialState);

  useEffect(() => {
    const fetchHikeData = async () => {
      try {
        const token = localStorage.getItem("token") || "";

        dispatch({ type: HikeActionType.INIT_FETCH_HIKE_DATA });
        const hikes = await hikeService.getHikes(token);
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
            payload: { error: "Fetch Hikes Failed" },
          });
        }
      } catch (error: Error | any) {
        dispatch({
          type: HikeActionType.FETCH_HIKE_DATA_FAILED,
          payload: { error: error.response.data.message },
        });
      }
    };
    fetchHikeData();
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: HikeActionType.RESET_HIKE_RESPONSE,
    });
  }, []);

  const create = useCallback(async (newHike: NewHike) => {
    try {
      const token = localStorage.getItem("token") || "";

      dispatch({ type: HikeActionType.INIT_CREATE });
      const response = await hikeService.create(newHike, token);

      if (response) {
        const hike: IHike = response.results;
        dispatch({ type: HikeActionType.CREATE_SUCCESSFUL, payload: { hike } });
      } else {
        dispatch({
          type: HikeActionType.CREATE_FAILED,
          payload: { error: "Failed to add new Hike" },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: HikeActionType.CREATE_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  const update = useCallback(async (udpateHike: UpdateHike, hikeId: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      dispatch({ type: HikeActionType.INIT_UPDATE });
      const response = await hikeService.update(udpateHike, hikeId, token);
      if (response) {
        const hike: IHike = response;
        dispatch({ type: HikeActionType.UPDATE_SUCCESSFUL, payload: { hike } });
      } else {
        dispatch({
          type: HikeActionType.UPDATE_FAILED,
          payload: { error: "Update hike failed" },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: HikeActionType.UPDATE_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  const deleteHike = useCallback(async (hikeId: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      dispatch({ type: HikeActionType.INIT_DELETE });
      const response = await hikeService.deleteHike(hikeId, token);
      if (response.affected === 1) {
        dispatch({
          type: HikeActionType.DELETE_SUCCESSFUL,
          payload: { hikeId: hikeId },
        });
      } else {
        dispatch({
          type: HikeActionType.DELETE_FAILED,
          payload: { error: "Failed to delete Hike" },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: HikeActionType.DELETE_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  }, []);

  const value = useMemo(
    () => ({ state, actions: { create, reset, deleteHike, update } }),
    [state, create, reset, deleteHike, update]
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
