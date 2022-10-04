import React, { useEffect } from "react";
import { useAuthState } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Dashboard: React.FC = () => {
  const { user, loading } = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  if (loading) {
    return (
      <div className="container app-body py-5">
        <div className="container">
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
    <div>
      <div>
        <h1 className="title">Adirondack High Peaks</h1>
        <p>
          With 46 High Peaks, the Adirondacks offer a gratifying challenge for
          avid hikers and aspiring hikers alike. Dedicated hikers who complete
          all 46 hikes become “46ers,” a meaningful and impressive
          accomplishment. Which Adirondack High Peak will you hike first?
        </p>
      </div>
      <div>
        <h2>The 46 Peaks</h2>
      </div>
    </div>
  );
};

export default Dashboard;
