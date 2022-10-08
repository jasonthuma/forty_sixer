import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { IHike } from "../@types/hike";
import { IMountain } from "../@types/mountain";
import { useHikeState } from "../context/HikeContext";
import { getHikesFromMountainId } from "../utils/getHikesFromMountainId";
import Hike from "./Hike";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface MountainProps {
  mountain: IMountain;
}

const Mountain: React.FC<MountainProps> = ({ mountain }) => {
  const { hikes } = useHikeState();
  const [filteredHikes, setFilteredHikes] = useState<IHike[]>([]);

  useEffect(() => {
    setFilteredHikes(getHikesFromMountainId(hikes, mountain.id));
  }, [hikes, mountain.id]);
  return (
    <>
      <Accordion.Item
        className="border border-success success"
        key={mountain.id}
        eventKey={String(mountain.id)}
      >
        <Accordion.Header>
          {filteredHikes.length > 0 && (
            <FaCheckCircle style={{ color: "#198754" }} className="me-2" />
          )}
          {mountain.id}. {mountain.name}
        </Accordion.Header>

        <Accordion.Body>
          {filteredHikes.length > 0 && (
            <Accordion className="hikeList">
              {filteredHikes.map((hike: IHike) => (
                <Hike key={hike.id} hike={hike} />
              ))}
            </Accordion>
          )}
          {filteredHikes.length === 0 && (
            <p>
              You have yet to hike {mountain.name}. Click{" "}
              <Link to="/record" style={{ color: "#FFD700" }}>
                here
              </Link>{" "}
              to record one!
            </p>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default Mountain;
