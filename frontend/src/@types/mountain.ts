export interface IMountain {
  id: number;
  name: string;
  elevation: number;
  difficulty: number;
  ascent: number;
  length: number;
  hikeTime: number;
  description: string;
}

export interface IMountainContext {
  state: IMountainState;
  actions: IMountainAction;
}

export interface IMountainState {
  mountains: IMountain[];
  loadingMountains: boolean;
  errorMountains: string;
}

export interface IMountainAction {
  mountainUserLogout: () => void;
  fetchMountainData: () => void;
}

export enum MountainActionType {
  INIT_FETCH_MOUNTAIN_DATA = "INIT_FETCH_MOUNTAIN_DATA",
  FETCH_MOUNTAIN_DATA_SUCCESSFUL = "FETCH_MOUNTAIN_DATA_SUCCESSFUL",
  FETCH_MOUNTAIN_DATA_FAILED = "FETCH_MOUNTAIN_DATA_FAILED",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

export interface MountainAction {
  type: MountainActionType;
  payload?: {
    mountains?: IMountain[];
    error?: string;
  };
}
