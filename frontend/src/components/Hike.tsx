import { useEffect, useState } from "react";
import { Accordion, Button, Alert, Modal, Form } from "react-bootstrap";
import { IHike } from "../@types/hike";

interface HikeProps {
  hike: IHike;
}

const Hike: React.FC<HikeProps> = ({ hike }) => {
  const dateString = String(hike.hikeDate).slice(0, 10);

  return (
    <>
      <Accordion.Item
        className="border border-warning"
        key={hike.id}
        eventKey={hike.id}
      >
        <Accordion.Header>{dateString}</Accordion.Header>

        <Accordion.Body>
          <p>Hikers: {hike.hikers}</p>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default Hike;
