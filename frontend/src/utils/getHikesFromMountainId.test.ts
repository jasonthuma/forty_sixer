import { getHikesFromMountainId } from "./getHikesFromMountainId";
import { test_hikes_with_duplicates } from "./test_data";

describe("Hikes should be filtered down to return only hikes that were on the given mountain id", () => {
  it("should filter out the hikes for given mountain", () => {
    const algonquinHike = getHikesFromMountainId(test_hikes_with_duplicates, 2);
    expect(algonquinHike.length).toEqual(1);
  });

  it("should have the proper mountain info associated with the filtered hikes", () => {
    const algonquinHike = getHikesFromMountainId(test_hikes_with_duplicates, 2);
    expect(algonquinHike[0].mountainId).toBe(2);
  });

  it("should get all hikes for the given mountain, even if there are more than one", () => {
    const marcyHikes = getHikesFromMountainId(test_hikes_with_duplicates, 1);
    expect(marcyHikes.length).toEqual(2);
  });

  it("should order the filtered hikes by date from oldest first to newest last", () => {
    const marcyHikes = getHikesFromMountainId(test_hikes_with_duplicates, 1);
    expect(marcyHikes[0].id).toBe("testId5");
  });
});
