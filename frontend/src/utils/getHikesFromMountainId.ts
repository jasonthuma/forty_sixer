import { IHike } from "../@types/hike";

export const getHikesFromMountainId = (hikes: IHike[], mountainId: number) => {
  let filteredHikes: IHike[] = [];
  for (const hike of hikes) {
    if (hike.mountainId === mountainId) {
      filteredHikes.push(hike);
    }
  }
  filteredHikes.sort((a, b) => a.hikeDate.localeCompare(b.hikeDate));
  return filteredHikes;
};
