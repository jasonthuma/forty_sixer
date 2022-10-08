export interface IHike {
  id: string;
  hikeDate: string;
  hikers: string;
  weather: string;
  tripReport: string;
  userId: string;
  mountainId: number;
}

export interface NewHike {
  hikeDate: string;
  hikers: string;
  weather: string;
  tripReport: string;
  userId: string;
  mountainName: string;
}

export interface UpdateHike {
  hikeDate?: string;
  hikers?: string;
  weather?: string;
  tripReport?: string;
  userId?: string;
  mountainId?: number;
}

export interface IHikeContext {
  state: IHikeState;
  actions: IHikeAction;
}

export enum Status {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface IHikeState {
  hikes: IHike[];
  status: Status;
  loadingHikes: boolean;
  errorHikes: string;
}

export interface IHikeAction {
  create: (hike: NewHike) => void;
  reset: () => void;
  update: (hike: UpdateHike, hikeId: string) => void;
  deleteHike: (hikeId: string) => void;
  hikeUserLogout: () => void;
  fetchHikeData: () => void;
}

export enum HikeActionType {
  INIT_CREATE = "INIT_CREATE",
  CREATE_SUCCESSFUL = "CREATE_SUCCESSFUL",
  CREATE_FAILED = "CREATE_FAILED",
  INIT_UPDATE = "INIT_UPDATE",
  UPDATE_SUCCESSFUL = "UPDATE_SUCCESSFUL",
  UPDATE_FAILED = "UPDATE_FAILED",
  INIT_DELETE = "INIT_DELETE",
  DELETE_SUCCESSFUL = "DELETE_SUCCESSFUL",
  DELETE_FAILED = "DELETE_FAILED",
  INIT_FETCH_HIKE_DATA = "INIT_FETCH_HIKE_DATA",
  FETCH_HIKE_DATA_SUCCESSFUL = "FETCH_HIKE_DATA_SUCCESSFUL",
  FETCH_HIKE_DATA_FAILED = "FETCH_HIKE_DATA_FAILED",
  RESET_HIKE_RESPONSE = "RESET_HIKE_RESPONSE",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

export interface HikeAction {
  type: HikeActionType;
  payload?: {
    hike?: IHike;
    hikes?: IHike[];
    error?: string;
    hikeId?: string;
  };
}
