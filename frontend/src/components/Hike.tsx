import { useEffect, useState, FormEvent } from "react";
import { Accordion, Button, Alert, Modal, Form } from "react-bootstrap";
import { IHike, UpdateHike } from "../@types/hike";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdOutlinePersonPinCircle } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";
import { GiMountaintop } from "react-icons/gi";
import { useHikeActions } from "../context/HikeContext";
import { useMountainState } from "../context/MountainContext";
import { IMountain } from "../@types/mountain";
import { useAuthState } from "../context/AuthContext";
interface HikeProps {
  hike: IHike;
}

const Hike: React.FC<HikeProps> = ({ hike }) => {
  const dateString = hike.hikeDate.slice(0, 10);
  const { reset, deleteHike, update } = useHikeActions();
  const { mountains } = useMountainState();
  const { user } = useAuthState();
  const token = localStorage.getItem("token");

  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => setUpdateShow(true);
  const [updateAlert, setUpdateAlert] = useState("");
  const [hikeAlert, setHikeAlert] = useState("");
  const [hikeType, setHikeType] = useState("");
  const [hikers, setHikers] = useState(hike.hikers);
  const handleHikersChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setHikers(event.target.value);
  const [date, setDate] = useState(hike.hikeDate.slice(0, 10));
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDate(event.target.value);
  const [weather, setWeather] = useState(hike.weather);
  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWeather(event.target.value);
  const [tripReport, setTripReport] = useState(hike.tripReport);
  const handleTripReportChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTripReport(event.target.value);
  const [mountainName, setMountainName] = useState("");
  const [mountainId, setMountainId] = useState(hike.mountainId);

  const handleMountainChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMountainName(event.target.value);
    for (const mountain of mountains) {
      if (mountainName === mountain.name) {
        setMountainId(mountain.id);
      }
    }
  };

  useEffect(() => {
    for (const mountain of mountains) {
      if (hike.mountainId === mountain.id) {
        setMountainName(mountain.name);
      }
    }
  }, [hike.mountainId, mountains]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    deleteHike(e.currentTarget.id);
    setHikeAlert("Hike was deleted");
    setHikeType("danger");
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
    if (hikers.length === 0) {
      setUpdateAlert("Hikers are required");
      return;
    }
    if (weather.length === 0) {
      setUpdateAlert("Weather description is required");
      return;
    }
    if (tripReport.length === 0) {
      setUpdateAlert("Trip report description is required");
      return;
    }
    if (user && token) {
      const updateHike: UpdateHike = {
        hikeDate: date,
        hikers,
        weather,
        tripReport,
        userId: user.id,
        mountainId,
      };
      update(updateHike, hike.id);
      setHikeAlert("Updated Successfully!");
      setHikeType("success");
      handleUpdateClose();
    } else {
      setHikeAlert("No active user");
      setHikeType("danger");
    }
  };

  return (
    <>
      <Accordion.Item
        className="border border-warning"
        key={hike.id}
        eventKey={hike.id}
      >
        <Accordion.Header>{dateString}</Accordion.Header>

        <Accordion.Body>
          <div className="container p-0">
            <div className="row align-items-center">
              {hikeAlert && <Alert variant={hikeType}>{hikeAlert}</Alert>}
              <div className="col-sm-8 text-start">
                <p>
                  <MdOutlinePersonPinCircle className="me-1" size={28} />
                  Hikers: {hike.hikers}
                </p>
                <p>
                  <TiWeatherPartlySunny className="me-1" size={28} />
                  Weather: {hike.weather}
                </p>
                <p>
                  <TbReportSearch className="me-1" size={28} />
                  Trip Report: {hike.tripReport}
                </p>
              </div>
              <div className="col-sm-4">
                <div className="d-grid gap-3">
                  <Button variant="warning" onClick={handleUpdateShow}>
                    Update
                  </Button>
                  <Button variant="danger" id={hike.id} onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Modal show={updateShow} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <h3>Update Hike Details</h3>
        </Modal.Header>
        <Modal.Body>
          {updateAlert && <Alert variant="danger">{updateAlert}</Alert>}
          <Form onSubmit={handleUpdate}>
            <div className="container">
              <div className="text-start">
                <Form.Group controlId="hikers">
                  <Form.Label>
                    <h5 className="mt-1">
                      <MdOutlinePersonPinCircle className="me-1" size={25} />
                      Hikers
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    data-testid={"hikers"}
                    value={hikers}
                    onChange={handleHikersChange}
                    placeholder="Who went on the hike?"
                    className="mb-1 border border-success"
                  />
                </Form.Group>
                <Form.Group controlId="date">
                  <Form.Label>
                    <h5 className="mt-1">
                      <BsCalendarDate className="me-2" size={23} />
                      Hike Date
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    data-testid="date"
                    value={date}
                    onChange={handleDateChange}
                    className="mb-1 border border-success"
                  />
                </Form.Group>
                <Form.Group controlId="weather">
                  <Form.Label>
                    <h5 className="mt-1">
                      <TiWeatherPartlySunny className="me-1" size={25} />
                      Weather
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    data-testid={"weather"}
                    value={weather}
                    onChange={handleWeatherChange}
                    placeholder="What was the weather?"
                    className="mb-1 border border-success"
                  />
                </Form.Group>
                <Form.Group controlId="tripReport">
                  <Form.Label>
                    <h5 className="mt-1">
                      <TbReportSearch className="me-1" size={25} />
                      Trip Report
                    </h5>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    data-testid={"tripReport"}
                    value={tripReport}
                    onChange={handleTripReportChange}
                    placeholder="What happened on the hike?"
                    className="mb-1 border border-success"
                  />
                </Form.Group>
                <Form.Group controlId="mountain">
                  <Form.Label>
                    <h5 className="mt-1">
                      <GiMountaintop className="me-2" size={25} />
                      Mountain
                    </h5>
                  </Form.Label>
                  <Form.Select
                    value={mountainName}
                    onChange={handleMountainChange}
                    className="border border-success"
                  >
                    {mountains.map((mountain: IMountain) => (
                      <option key={mountain.id} value={mountain.name}>
                        {mountain.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="text-center">
              <Button variant="warning" type="submit" className="mt-3">
                Update Hike
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Hike;
