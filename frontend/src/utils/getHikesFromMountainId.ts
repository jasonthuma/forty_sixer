import { IHike } from "../@types/hike";
import { IMountain } from "../@types/mountain";

export const getHikesFromMountainId = (hikes: IHike[], mountainId: number) => {
  let filteredHikes: IHike[] = [];
  for (const hike of hikes) {
    if (hike.mountainId === mountainId) {
      filteredHikes.push(hike);
    }
  }
  return filteredHikes;
};
