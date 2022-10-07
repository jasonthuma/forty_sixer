import { Link } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";
import { BsFillGearFill, BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdRuleFolder, MdPersonAdd } from "react-icons/md";
import { TbFilePencil, TbLogin } from "react-icons/tb";

const Footer: React.FC = () => {
  const { user } = useAuthState();
  return (
    <footer className="bg-warning">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-6">
            <h6 className="pt-3 mb-3">
              <p>Internal Links</p>
            </h6>
            {!user && (
              <p>
                <Link
                  to="/login"
                  style={{
                    color: "#228b22",
                    textDecoration: "none",
                  }}
                >
                  <TbLogin className="me-1" size={20} />
                  Login
                </Link>
              </p>
            )}
            {!user && (
              <p>
                <Link
                  to="/register"
                  style={{
                    color: "#228b22",
                    textDecoration: "none",
                  }}
                >
                  <MdPersonAdd className="me-1" size={20} />
                  Register
                </Link>
              </p>
            )}
            {user && (
              <p>
                <Link
                  to="/journal"
                  style={{
                    color: "#228b22",
                    textDecoration: "none",
                  }}
                >
                  <BsFillJournalBookmarkFill className="me-2" />
                  Journal
                </Link>
              </p>
            )}
            {user && (
              <p>
                <Link
                  to="/record"
                  style={{
                    color: "#228b22",
                    textDecoration: "none",
                  }}
                >
                  <TbFilePencil className="me-1" size={20} />
                  Record Hike
                </Link>
              </p>
            )}
            <p>
              <Link
                to="/rules"
                style={{
                  color: "#228b22",
                  textDecoration: "none",
                }}
              >
                <MdRuleFolder className="me-1" size={20} />
                ADK Rules
              </Link>
            </p>
            <p>
              <Link
                to="/gear"
                style={{
                  color: "#228b22",
                  textDecoration: "none",
                }}
              >
                <BsFillGearFill className="me-1" size={20} />
                Recommended Gear
              </Link>
            </p>
          </div>
          <div className="col-6 mb-3">
            <h6 className="pt-3 mb-3">Helpful External Links for ADK Prep:</h6>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://visitadirondacks.com/"
                style={{
                  color: "#228b22",
                  textDecoration: "none",
                }}
              >
                Visit Adirondacks Website
              </a>
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://goeast.ems.com/coexist-bears-adirondacks/"
                style={{
                  color: "#228b22",
                  textDecoration: "none",
                }}
              >
                Tips for Bear Encounters
              </a>
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.dec.ny.gov/outdoor/28708.html"
                style={{
                  color: "#228b22",
                  textDecoration: "none",
                }}
              >
                Hike Smart NY
              </a>
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lnt.org/why/7-principles/"
                style={{
                  color: "#228b22",
                  textDecoration: "none",
                }}
              >
                7 Principles
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
