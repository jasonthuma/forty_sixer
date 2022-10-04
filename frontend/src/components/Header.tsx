import { Link } from "react-router-dom";
import { useAuthActions, useAuthState } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <div className="logo">
          <Link to="/" style={{ color: "#edefef", textDecoration: "none" }}>
            <h3>Trail to 46</h3>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar">
          <ul className="navbar-nav ms-auto">
            {!user && (
              <li className="nav-item mx-1" key="1">
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li className="nav-item mx-1" key="2">
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item mx-1" key="3">
                <button
                  className="btn btn-link p-0"
                  style={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
