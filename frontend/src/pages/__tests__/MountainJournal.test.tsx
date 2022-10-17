import * as mountain from "../../context/MountainContext";
import * as auth from "../../context/AuthContext";
import * as hike from "../../context/HikeContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { test_mountain_data } from "../../utils/test_data";
import MountainJournal from "../MountainJournal";
import Dashboard from "../Dashboard";
import "@testing-library/jest-dom/extend-expect";

describe("MountainJournal page testing", () => {
  it("should render out with the list of mountains", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    render(
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal" element={<MountainJournal />} />
          <Route path="/login" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Mt. Marcy")).toBeInTheDocument();
  });

  it("should redirect to the login page if there is no token present", () => {
    localStorage.removeItem("token");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <MountainJournal />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(global.window.location.href).toContain("/login");
  });
});
