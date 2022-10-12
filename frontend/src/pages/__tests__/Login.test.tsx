import Login from "../Login";
import { render, screen, fireEvent } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import * as auth from "../../context/AuthContext";
import Header from "../../components/Header";
import Dashboard from "../Dashboard";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";

describe("Login page testing", () => {
  it("should call the handle change functions when input changes", () => {
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    expect(email).toHaveValue("test@work.com");
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "test1234" } });
    expect(password).toHaveValue("test1234");
  });
  it("should alert the user all fields are required if either input is empty", () => {
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Please fill out all fields"));
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
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
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
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Logging In")).toBeInTheDocument();
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
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    );
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "test@work.com" } });
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "test1234" } });
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Initiating log in")).toBeInTheDocument();
  });
});
