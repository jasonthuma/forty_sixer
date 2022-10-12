import Header from "../Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as auth from "../../context/AuthContext";

describe("Header component testing", () => {
  it("should render with login and register when there is no user", () => {
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
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("should render with logout, journal and record hike links when there is a user", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: false,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Test Name")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Journal")).toBeInTheDocument();
    expect(screen.getByText("Record Hike")).toBeInTheDocument();
  });

  it("should call the logout function when logout is clicked", () => {
    jest.clearAllMocks();
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: false,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    const logoutLink = screen.getByText("Logout");
    fireEvent.click(logoutLink);
    expect(global.window.location.href).toContain("/login");
  });
});
