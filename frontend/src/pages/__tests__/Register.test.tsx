import Login from "../Login";
import { render, screen, fireEvent } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import * as auth from "../../context/AuthContext";
import Register from "../Register";

describe("Register page testing", () => {
  it("should call the handle change functions when input changes", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <Register />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
    const name = screen.getByLabelText("Name");
    fireEvent.change(name, { target: { value: "test" } });
    expect(name).toHaveValue("test");
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    expect(email).toHaveValue("test@work.com");
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "test1234" } });
    expect(password).toHaveValue("test1234");
    const confirmPassword = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPassword, { target: { value: "test1234" } });
    expect(confirmPassword).toHaveValue("test1234");
  });

  it("should render out any error messages for the user to view", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "Test error message",
      message: "",
    }));
    render(
      <Router>
        <Register />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("should render out the loading screen while logging in", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: true,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <Register />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Creating Account")).toBeInTheDocument();
  });

  it("should alert the user all fields are required if any input is empty", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <Register />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Please fill out all fields"));
  });

  it("should alert the user passwords dont match if they dont", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <Register />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
    const name = screen.getByLabelText("Name");
    fireEvent.change(name, { target: { value: "test" } });
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "test1234" } });
    const confirmPassword = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPassword, { target: { value: "test123" } });
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Passwords do not match"));
  });

  it("should alert the user length is too short if less than 8 characters", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <Register />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
    const name = screen.getByLabelText("Name");
    fireEvent.change(name, { target: { value: "test" } });
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "test123" } });
    const confirmPassword = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPassword, { target: { value: "test123" } });
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Password must be 8 characters"));
  });

  it("should log in if details are provided and button is clicked", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));
    render(
      <Router>
        <Register />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
    const name = screen.getByLabelText("Name");
    fireEvent.change(name, { target: { value: "test" } });
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "test1234" } });
    const confirmPassword = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPassword, { target: { value: "test1234" } });
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Initiating registration")).toBeInTheDocument();
  });
});
