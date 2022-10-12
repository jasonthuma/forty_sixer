import Mountain from "../Mountain";
import * as hike from "../../context/HikeContext";
import { render, screen } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";
import {
  test_mountain_data,
  test_hikes_with_duplicates,
} from "../../utils/test_data";
import { IMountain } from "../../@types/mountain";
import { Status } from "../../@types/hike";

describe("Mountain component testing", () => {
  it("should render with a message to tell the user they have not hiked it yet if no hikes exist", () => {
    const marcy: IMountain = test_mountain_data[0];
    render(
      <Router>
        <Mountain mountain={marcy} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(
      screen.getByText("You have yet to hike Mt. Marcy.", { exact: false })
    ).toBeInTheDocument();
  });

  it("should show the hikes associated with the given mountain if they exist", () => {
    const marcy: IMountain = test_mountain_data[0];
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));
    render(
      <Router>
        <Mountain mountain={marcy} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const marcyHike = screen.getByText("2018-08-10");
    expect(marcyHike).toBeInTheDocument();
  });

  it("should sort the hikes by the date given, oldest first", () => {
    const marcy: IMountain = test_mountain_data[0];
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));
    render(
      <Router>
        <Mountain mountain={marcy} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );
    const html = document.body.innerHTML;
    const oldHike = html.search("2018-08-10");
    const newHike = html.search("2019-10-10");
    expect(oldHike).toBeLessThan(newHike);
  });
});
