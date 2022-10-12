import * as mountain from "../../context/MountainContext";
import * as auth from "../../context/AuthContext";
import Dashboard from "../Dashboard";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { test_mountain_data } from "../../utils/test_data";
import Header from "../../components/Header";

describe("Dashboard page testing", () => {
  it("should render out with the list of mountains", () => {
    //const setItem = jest.spyOn(Storage.prototype, "setItem");
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
        </Routes>
      </Router>
    );
    expect(screen.getByText("Mt. Marcy")).toBeInTheDocument();
  });

  it("should render mountain details if a mountain from the list is clicked", () => {
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
        </Routes>
      </Router>
    );
    const marcy = screen.getByText("Mt. Marcy");
    fireEvent.click(marcy);
    expect(screen.getByText("Elevation: 5344 ft")).toBeInTheDocument();
  });

  it("should render the loading screen if it is fetching user data", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: true,
      error: "",
      message: "",
    }));
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    render(
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
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
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(global.window.location.href).toContain("/login");
  });
});
