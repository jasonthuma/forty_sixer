import { Accordion } from "react-bootstrap";
import { IMountain } from "../@types/mountain";
import { useMountainState } from "../context/MountainContext";
import Mountain from "./Mountain";

const MountainList: React.FC = () => {
  const { mountains } = useMountainState();

  return (
    <div className="container text-center mt-4">
      <Accordion className="mountainList ps-0">
        {mountains.map((mountain: IMountain) => (
          <Mountain key={mountain.id} mountain={mountain} />
        ))}
      </Accordion>
    </div>
  );
};

export default MountainList;
