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
    <nav className="navbar navbar-expand-lg bg-success fixed-top">
      <div className="logo ps-lg-5">
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
      <div className="navbar-collapse collapse pe-lg-5" id="navbar">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2" key="1">
            <Link
              style={{
                color: "#FFD700",
                textDecoration: "none",
              }}
              to="/rules"
            >
              ADK Rules
            </Link>
          </li>

          <li className="nav-item mx-2" key="2">
            <Link
              style={{
                color: "#FFD700",
                textDecoration: "none",
              }}
              to="/gear"
            >
              Recommended Gear
            </Link>
          </li>

          {!user && (
            <li className="nav-item mx-2" key="3">
              <Link
                style={{
                  color: "#FFD700",
                  textDecoration: "none",
                }}
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
          {!user && (
            <li className="nav-item mx-2" key="4">
              <Link
                style={{
                  color: "#FFD700",
                  textDecoration: "none",
                }}
                to="/register"
              >
                Register
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-item dropdown mx-2" key="5">
              <button
                className="nav-link dropdown-toggle profile-btn p-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: "#FFD700",
                  textDecoration: "none",
                }}
              >
                {user.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-success text-center">
                <li>
                  <Link
                    style={{
                      color: "#FFD700",
                      textDecoration: "none",
                    }}
                    to="/journal"
                  >
                    Journal
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="btn btn-link dropdown-item p-0"
                    style={{ color: "#FFD700", textDecoration: "none" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
