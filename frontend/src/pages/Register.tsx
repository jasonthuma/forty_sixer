import React, { useState, useEffect, FormEvent } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NewUser } from "../@types/user";
import { useAuthActions, useAuthState } from "../context/AuthContext";
import { useHikeActions } from "../context/HikeContext";
import { useMountainActions } from "../context/MountainContext";
import { MdPersonAdd } from "react-icons/md";

const Register: React.FC = () => {
  //bring in global context state & actions
  const { loading, error, user } = useAuthState();
  const { register } = useAuthActions();
  const { fetchHikeData } = useHikeActions();
  const { fetchMountainData } = useMountainActions();

  //local state
  const [username, setUsername] = useState("");
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();

  //check for errors and if there is a user fetch their data then navigate to home
  useEffect(() => {
    if (error) {
      setAlertText(error);
    }
    if (user) {
      fetchMountainData();
      fetchHikeData();
      navigate("/");
    }
  }, [
    user,
    loading,
    error,
    navigate,
    register,
    fetchHikeData,
    fetchMountainData,
  ]);

  //handle registration submit
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertText("Passwords do not match");
      return;
    }
    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setAlertText("Please fill out all fields");
      return;
    }
    if (password.length && confirmPassword.length < 8) {
      setAlertText("Password must be 8 characters");
      return;
    }

    const newUser: NewUser = {
      email,
      password,
      username,
    };
    register(newUser);
  };

  //while authenticating show the user a loading screen
  if (loading) {
    return (
      <div className="app-body dix-range">
        <div className="container form-div">
          <div className="text-center">
            <h1>
              <Spinner animation="border" /> Creating Account
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-body dix-range">
      <div className="container">
        <div className="row form-div justify-content-center align-items-center form-div">
          <div className="col-sm-6 p-5 border form">
            <div className="text-center">
              <h1>
                <MdPersonAdd className="pb-1" size={45} /> Register
              </h1>
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your name"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password (8 character minimum)"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmChange}
                  placeholder="Confirm password"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <div className="d-grid my-3">
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            {alertText && <Alert variant="danger">{alertText}</Alert>}
            <div className="text-center">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
