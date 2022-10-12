import React, { useEffect, useState } from "react";
import { useAuthState } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { IMountain } from "../@types/mountain";
import { useMountainState } from "../context/MountainContext";

const Dashboard: React.FC = () => {
  const token = localStorage.getItem("token");
  const { loading } = useAuthState();
  const { mountains } = useMountainState();

  const navigate = useNavigate();

  const [displayedMountain, setDisplayedMountain] = useState<IMountain>();

  const handleMountainClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const mountainName = e.currentTarget.innerHTML;
    const mountainDetails = mountains.find((mountain) => {
      return mountain.name === mountainName;
    });
    setDisplayedMountain(mountainDetails);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  if (loading) {
    return (
      <div className="app-body py-5">
        <div className="container">
          <div className="text-center">
            <h1>
              <Spinner animation="border" /> Loading...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-body">
      <div className="dix-range">
        <div className="container">
          <div className="text-center">
            <h1 className="title">Adirondack High Peaks</h1>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <p>
                  With 46 High Peaks, the Adirondacks offer a gratifying
                  challenge for avid hikers and aspiring hikers alike. Dedicated
                  hikers who complete all 46 hikes become “46ers,” a meaningful
                  and impressive accomplishment. Which Adirondack High Peak will
                  you hike first?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-5">
        <div>
          <div className="text-center my-4">
            <h2>The 46 Peaks</h2>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ol className="mountains">
                {mountains &&
                  mountains.map((mountain) => {
                    if (mountain === displayedMountain) {
                      return (
                        <li
                          key={mountain.id}
                          onClick={handleMountainClick}
                          className="clicked"
                        >
                          {mountain.name}
                        </li>
                      );
                    } else {
                      return (
                        <li key={mountain.id} onClick={handleMountainClick}>
                          {mountain.name}
                        </li>
                      );
                    }
                  })}
              </ol>
            </div>
            <div className="col-lg-6">
              {!displayedMountain && (
                <h2>Click on a mountain to view its details</h2>
              )}
              {displayedMountain && (
                <div>
                  <h5 className="mb-3">Name: {displayedMountain.name}</h5>
                  <p>Elevation: {displayedMountain.elevation} ft</p>
                  <p>Ascent: {displayedMountain.ascent} ft</p>
                  <p>Avg length round trip: {displayedMountain.length} mi</p>
                  <p>Average hiking time: {displayedMountain.hikeTime} hrs</p>
                  <p>
                    Difficulty Rating (Scale: 1-7):{" "}
                    {displayedMountain.difficulty}
                  </p>
                  <p>{displayedMountain.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
