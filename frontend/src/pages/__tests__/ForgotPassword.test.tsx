import { render, screen, fireEvent } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import * as auth from "../../context/AuthContext";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";

describe("ForgotPassword page testing", () => {
  it("should call the handle change functions when input changes", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ForgotPassword />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    expect(email).toHaveValue("test@work.com");
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
        <ForgotPassword />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
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
        <ForgotPassword />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Reset sent successfully")).toBeInTheDocument();
  });

  it("should alert the user that email is required if submitted while input is empty", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ForgotPassword />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    const requestBtn = screen.getByText("Request Password Reset Link");
    fireEvent.click(requestBtn);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("should send the reset link if email is provided", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "Reset sent successfully",
    }));

    render(
      <Router>
        <ForgotPassword />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    const requestBtn = screen.getByText("Request Password Reset Link");
    fireEvent.click(requestBtn);
    expect(screen.getByText("Reset sent successfully")).toBeInTheDocument();
  });

  it("should render loading message while generating link", () => {
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: true,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <ForgotPassword />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );

    expect(screen.getByText("Sending Password Reset Link")).toBeInTheDocument();
  });
});
