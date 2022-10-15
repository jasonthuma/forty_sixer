import { useState, useEffect } from "react";
import { useAuthActions, useAuthState } from "../context/AuthContext";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { userId, resetString } = useParams();
  const { error, message, loading } = useAuthState();
  const { resetPassword } = useAuthActions();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);
  const handleNewPasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setNewPasswordConfirm(e.target.value);

  useEffect(() => {
    if (error) {
      setAlertType("danger");
      setAlertText(error);
    }
    if (message) {
      setAlertType("success");
      setAlertText(message);
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [setAlertText, error, message, navigate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword.length === 0 || newPasswordConfirm.length === 0) {
      setAlertType("danger");
      setAlertText("Please enter a new password");
      return;
    }
    if (newPassword.length < 8) {
      setAlertType("danger");
      setAlertText("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setAlertType("danger");
      setAlertText("Passwords do not match");
      return;
    }
    if (userId && resetString) {
      resetPassword(newPassword, userId, resetString);
    } else {
      setAlertType("danger");
      setAlertText("Error sending reset request, please try again");
    }
  };

  if (loading) {
    return (
      <div className="app-body dix-range">
        <div className="container form-div">
          <div className="row form-div align-items-center text-center">
            <h1>
              <Spinner animation="border" /> Resetting password
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
                <BsFillShieldLockFill className="me-1 pb-1" size={45} />
                Password Reset
              </h1>
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter email"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="confirmNewPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPasswordConfirm}
                  onChange={handleNewPasswordConfirmChange}
                  placeholder="Enter email"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <div className="d-grid my-3">
                <Button variant="secondary" type="submit">
                  Request Password Reset
                </Button>
              </div>
            </Form>
            {alertText && <Alert variant={alertType}>{alertText}</Alert>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
