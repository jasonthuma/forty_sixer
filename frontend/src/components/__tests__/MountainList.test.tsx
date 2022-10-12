import MountainList from "../MountainList";
import "@testing-library/jest-dom/extend-expect";
import * as mountain from "../../context/MountainContext";
import { test_mountain_data } from "../../utils/test_data";
import { render, screen } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

describe("MountainList component testing", () => {
  it("should render all mountains names to the screen that exist in mountainState", () => {
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      loadingMountains: false,
      errorMountains: "",
    }));

    render(
      <Router>
        <MountainList />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );
    const marcy = screen.getByText("1. Mt. Marcy");
    expect(marcy).toBeInTheDocument();
    const whiteface = screen.getByText("5. Whiteface Mtn.");
    expect(whiteface).toBeInTheDocument();
    const gothics = screen.getByText("10. Gothics");
    expect(gothics).toBeInTheDocument();
  });
});
