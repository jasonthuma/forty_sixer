export interface IHike {
  id: string;
  hikeDate: Date;
  hikers: string;
  weather: string;
  tripReport: string;
  userId: string;
  mountainId: number;
}

export type HikeContextType = {
  hikes: IHike[];
  createHike: (hike: IHike) => void;
  updateHike: (id: number) => void;
};
