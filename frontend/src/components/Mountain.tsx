import { useEffect, useState } from "react";
import { Accordion, Button, Alert, Modal, Form } from "react-bootstrap";
import { IHike } from "../@types/hike";
import { IMountain } from "../@types/mountain";
import { useHikeState } from "../context/HikeContext";
import { getHikesFromMountainId } from "../utils/getHikesFromMountainId";
import Hike from "./Hike";

interface MountainProps {
  mountain: IMountain;
}

const Mountain: React.FC<MountainProps> = ({ mountain }) => {
  const { hikes } = useHikeState();
  const [filteredHikes, setFilteredHikes] = useState<IHike[]>([]);

  useEffect(() => {
    setFilteredHikes(getHikesFromMountainId(hikes, mountain.id));
  }, [hikes]);
  return (
    <>
      <Accordion.Item
        className="border border-success"
        key={mountain.id}
        eventKey={String(mountain.id)}
      >
        <Accordion.Header>
          {filteredHikes.length > 0 && <p>icon goes here</p>}
          {mountain.id}. {mountain.name}
        </Accordion.Header>

        <Accordion.Body>
          <Accordion className="hikeList">
            {filteredHikes.map((hike: IHike) => (
              <Hike key={hike.id} hike={hike} />
            ))}
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default Mountain;
