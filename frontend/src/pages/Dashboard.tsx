import React, { useEffect, useState } from "react";
import { useAuthState } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { IMountain } from "../@types/mountain";

const Dashboard: React.FC = () => {
  const { user, loading } = useAuthState();
  const navigate = useNavigate();

  const [mountains, setMountains] = useState<IMountain[]>([]);
  const [displayedMountain, setDisplayedMountain] = useState<IMountain>();

  const handleMountainClick = async (e: React.MouseEvent<HTMLLIElement>) => {
    const mountain = e.currentTarget.innerHTML;
    const response = await axios.get("http://localhost:8000/mountains/search", {
      params: { name: mountain },
    });
    if (response) {
      setDisplayedMountain(response.data);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchMountainData = async () => {
      const response = await axios.get("http://localhost:8000/mountains");
      if (response) {
        setMountains(response.data);
      }
    };
    fetchMountainData();
  }, []);

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
      <div className="dix-range"></div>
      <div className="container">
        <div className="text-center">
          <h1 className="title">Adirondack High Peaks</h1>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p>
                With 46 High Peaks, the Adirondacks offer a gratifying challenge
                for avid hikers and aspiring hikers alike. Dedicated hikers who
                complete all 46 hikes become “46ers,” a meaningful and
                impressive accomplishment. Which Adirondack High Peak will you
                hike first?
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center my-4">
            <h2>The 46 Peaks</h2>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ol>
                {mountains &&
                  mountains.map((mountain) => (
                    <li key={mountain.id} onClick={handleMountainClick}>
                      {mountain.name}
                    </li>
                  ))}
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
                  <p>Average trail length: {displayedMountain.length} mi</p>
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
