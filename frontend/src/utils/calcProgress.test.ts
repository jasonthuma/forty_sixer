import { calcProgress } from "./calcProgress";
import {
  test_hikes_no_duplicates,
  test_hikes_with_duplicates,
} from "./test_data";

describe("Progress gets calculated properly", () => {
  it("returns the properly formatted and rounded percent of the total of hikes possible for a given array of hikes", () => {
    const progress = calcProgress(test_hikes_no_duplicates);
    expect(progress).toEqual(13.0);
  });

  it("does not count duplicate mountains as two seperate mountains towared total progress", () => {
    const progressWithDuplicates = calcProgress(test_hikes_with_duplicates);
    expect(progressWithDuplicates).toEqual(10.9);
  });
});
