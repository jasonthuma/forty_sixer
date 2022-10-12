import Footer from "../Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as auth from "../../context/AuthContext";

describe("Footer component testing", () => {
  it("should render with login and register links when there is no user", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
        <Footer />
      </Router>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("should render with journal and record hike links when there is a user", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: false,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
        <Footer />
      </Router>
    );
    expect(screen.getByText("Journal")).toBeInTheDocument();
    expect(screen.getByText("Record Hike")).toBeInTheDocument();
  });
});
