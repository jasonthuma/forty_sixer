import ResetPassword from "../ResetPassword";
import Login from "../Login";
import { render, screen, fireEvent } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import * as auth from "../../context/AuthContext";

describe("ResetPassword page testing", () => {
  it("should call the handle change functions when input changes", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ResetPassword />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    );
    const password = screen.getByLabelText("New Password");
    fireEvent.change(password, { target: { value: "test1234" } });
    expect(password).toHaveValue("test1234");
    const confirmPassword = screen.getByLabelText("Confirm New Password");
    fireEvent.change(confirmPassword, { target: { value: "test123" } });
    expect(confirmPassword).toHaveValue("test123");
  });

  it("should alert the user to any errors received", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "Test error",
      message: "",
    }));

    render(
      <Router>
        <ResetPassword />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("should alert the user to any messages received", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "Reset sent successfully",
    }));

    render(
      <Router>
        <ResetPassword />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Reset sent successfully")).toBeInTheDocument();
  });
  it("should alert the user that a new password is required if submitted while either input is empty", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ResetPassword />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    );
    const requestBtn = screen.getByText("Request Password Reset");
    fireEvent.click(requestBtn);
    expect(screen.getByText("Please enter a new password")).toBeInTheDocument();
  });

  it("should alert the user that the passwords do not match when they don't", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ResetPassword />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    );
    const password = screen.getByLabelText("New Password");
    fireEvent.change(password, { target: { value: "test1234" } });
    const confirmPassword = screen.getByLabelText("Confirm New Password");
    fireEvent.change(confirmPassword, { target: { value: "test123" } });
    const requestBtn = screen.getByText("Request Password Reset");
    fireEvent.click(requestBtn);
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("should alert the user that the passwords must be minimum 8 characters when they are not", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ResetPassword />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    );
    const password = screen.getByLabelText("New Password");
    fireEvent.change(password, { target: { value: "test123" } });
    const confirmPassword = screen.getByLabelText("Confirm New Password");
    fireEvent.change(confirmPassword, { target: { value: "test123" } });
    const requestBtn = screen.getByText("Request Password Reset");
    fireEvent.click(requestBtn);
    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });

  it("should render loading message while resetting the password", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: true,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ResetPassword />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    );

    expect(screen.getByText("Resetting password")).toBeInTheDocument();
  });
});
