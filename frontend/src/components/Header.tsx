import { Link } from "react-router-dom";
import { useAuthActions, useAuthState } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle, MdRuleFolder, MdPersonAdd } from "react-icons/md";
import { BsFillGearFill, BsFillJournalBookmarkFill } from "react-icons/bs";
import { GiTrail } from "react-icons/gi";
import { TbLogin, TbLogout, TbFilePencil } from "react-icons/tb";
import { useHikeActions } from "../context/HikeContext";
import { useMountainActions } from "../context/MountainContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const { logout } = useAuthActions();
  const { hikeUserLogout } = useHikeActions();
  const { mountainUserLogout } = useMountainActions();

  const handleLogout = () => {
    logout();
    hikeUserLogout();
    mountainUserLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-success fixed-top">
      <div className="logo ps-lg-5 py-2">
        <Link to="/" style={{ color: "#FFD700", textDecoration: "none" }}>
          <h3>
            <GiTrail /> 46er
          </h3>
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
              <MdRuleFolder size={20} /> ADK Rules
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
              <BsFillGearFill className="me-1" size={20} />
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
                <TbLogin className="me-1" size={20} />
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
                <MdPersonAdd className="me-1" size={20} />
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
                <MdAccountCircle className="me-1" size={20} />
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
                    <BsFillJournalBookmarkFill className="me-2" />
                    Journal
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      color: "#FFD700",
                      textDecoration: "none",
                    }}
                    to="/record"
                  >
                    <TbFilePencil className="me-1" size={20} />
                    Record Hike
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
                    <TbLogout className="me-1" size={20} />
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
