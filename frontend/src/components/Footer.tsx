import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-warning">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-6">
            <h6 className="pt-3 mb-3">
              <p>Internal Links</p>
            </h6>
            <p>
              <Link
                to="/rules"
                style={{
                  color: "#228b22",
                  textDecoration: "none",
                }}
              >
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
