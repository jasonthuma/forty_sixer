import { IHike } from "../@types/hike";

export const calcProgress = (hikes: IHike[]) => {
  let mountainIds: number[] = [];
  for (const hike of hikes) {
    if (!mountainIds.includes(hike.mountainId)) {
      mountainIds.push(hike.mountainId);
    }
  }
  return Math.round((mountainIds.length / 46) * 100);
};
