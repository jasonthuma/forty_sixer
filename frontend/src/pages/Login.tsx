import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useAuthActions, useAuthState } from "../context/AuthContext";
import { LoginUser } from "../@types/user";
import { TbLogin } from "react-icons/tb";

const Login: React.FC = () => {
  //bring in global context state & actions
  const { loading, error, user } = useAuthState();
  const { login } = useAuthActions();

  //local state
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();

  //check for errors and if there is a user fetch their data then navigate to home
  useEffect(() => {
    if (error) {
      setAlertText(error);
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading, error, navigate, login]);

  //handle login submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setAlertText("Please fill out all fields");
      return;
    }
    const loginUser: LoginUser = {
      email,
      password,
    };
    login(loginUser);
  };

  //while authenticating show the user a loading screen
  if (loading) {
    return (
      <div className="app-body dix-range">
        <div className="container form-div">
          <div className="text-center">
            <h1>
              <Spinner animation="border" /> Logging In
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-body dix-range">
      <div className="container form-div">
        <div className="row form-div justify-content-center align-items-center form-div">
          <div className="col-sm-6 p-5 border form">
            <div className="text-center">
              <h1>
                <TbLogin className="me-1 pb-1" size={45} />
                Log In
              </h1>
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
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
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
