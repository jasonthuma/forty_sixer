import { IHike } from "../@types/hike";

export const calcProgress = (hikes: IHike[]) => {
  let mountainIds: number[] = [];
  for (const hike of hikes) {
    if (!mountainIds.includes(hike.mountainId)) {
      mountainIds.push(hike.mountainId);
    }
  }
  const propgressPercent = (mountainIds.length / 46) * 100;
  return Math.round(propgressPercent * 10) / 10;
};
