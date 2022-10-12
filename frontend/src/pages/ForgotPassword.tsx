import { useState, useEffect } from "react";
import { useAuthActions, useAuthState } from "../context/AuthContext";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { TbZoomQuestion } from "react-icons/tb";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const { error, message, loading } = useAuthState();
  const { forgotPassword, resetAuthResponse } = useAuthActions();
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (error) {
      setAlertType("danger");
      setAlertText(error);
    }
    if (message) {
      setAlertType("success");
      setAlertText(message);
    }
    if (alertText === "Email is required") {
      setAlertType("danger");
    }
  }, [setAlertText, error, message, alertText]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAuthResponse();
    if (email.length === 0) {
      setAlertText("Email is required");
      return;
    }
    forgotPassword(email);
  };

  if (loading) {
    return (
      <div className="app-body dix-range">
        <div className="container form-div">
          <div className="row form-div align-items-center text-center">
            <h1>
              <Spinner animation="border" /> Sending Password Reset Link
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
                <TbZoomQuestion className="me-1 pb-1" size={45} />
                Forgot Password
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

              <div className="d-grid my-3">
                <Button variant="secondary" type="submit">
                  Request Password Reset Link
                </Button>
              </div>
            </Form>
            {alertText && <Alert variant={alertType}>{alertText}</Alert>}
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

export default ForgotPassword;
