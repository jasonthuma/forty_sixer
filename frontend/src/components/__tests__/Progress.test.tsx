import Progress from "../Progress";
import * as hike from "../../context/HikeContext";
import { Status } from "../../@types/hike";
import { test_hikes_with_duplicates } from "../../utils/test_data";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Progress component testing", () => {
  it("should show the current progress on render", () => {
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      status: Status.IDLE,
      loadingHikes: false,
    }));
    render(<Progress />);
    const percent = screen.getByText("10.9%");
    expect(percent).toBeInTheDocument();
  });
});
