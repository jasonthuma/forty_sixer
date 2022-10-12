import { useState, useEffect, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IMountain } from "../@types/mountain";
import { useHikeActions, useHikeState } from "../context/HikeContext";
import { useMountainState } from "../context/MountainContext";
import { TbFilePencil, TbReportSearch } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdOutlinePersonPinCircle } from "react-icons/md";
import { GiMountaintop } from "react-icons/gi";
import { BsCalendarDate } from "react-icons/bs";
import { useAuthState } from "../context/AuthContext";
import { NewHike, Status } from "../@types/hike";

const RecordHike: React.FC = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuthState();
  const { errorHikes, status } = useHikeState();
  const { mountains } = useMountainState();
  const { create, reset } = useHikeActions();
  const navigate = useNavigate();

  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");
  const [hikers, setHikers] = useState("");
  let today = new Date().toJSON().slice(0, 10);
  const [date, setDate] = useState(today);
  const [weather, setWeather] = useState("");
  const [tripReport, setTripReport] = useState("");
  const [mountainName, setMountainName] = useState("Mt. Marcy");

  const handleHikersChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setHikers(event.target.value);
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDate(event.target.value);
  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWeather(event.target.value);
  const handleTripReportChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTripReport(event.target.value);
  const handleMountainChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setMountainName(event.target.value);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (status === Status.SUCCESS) {
      setHikers("");
      setWeather("");
      setDate(today);
      setTripReport("");
      setMountainName("Mt. Marcy");
    }
    switch (status) {
      case Status.FAILED:
        setAlertType("danger");
        setAlertText(errorHikes);
        return;
      case Status.SUCCESS:
        setAlertType("success");
        setAlertText("Successfully added hike to your journal!");
        return;
      case Status.IDLE:
        setAlertText("");
        return;
      case Status.PENDING:
        setAlertType("info");
        setAlertText("Adding new hike");
        return;
      default:
        setAlertType("danger");
        setAlertText("Status is required");
        return;
    }
  }, [token, navigate, errorHikes, status, setAlertText, setAlertType, today]);

  const handleCreateFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
    if (hikers.length === 0) {
      setAlertText("Hikers are required");
      return;
    }
    if (weather.length === 0) {
      setAlertText("Weather description is required");
      return;
    }
    if (tripReport.length === 0) {
      setAlertText("Trip report description is required");
      return;
    }
    if (user && token) {
      const newHike: NewHike = {
        hikeDate: date,
        hikers,
        weather,
        tripReport,
        userId: user.id,
        mountainName,
      };
      create(newHike);
    } else {
      setAlertType("danger");
      setAlertText("No active user");
    }
  };

  return (
    <div className="app-body dix-range">
      <div className="container text-center mt-1">
        <div className="row justify-content-center align-items-center form-div">
          <div className="col-lg-6">
            <h2>
              <TbFilePencil className="me-1 pb-1" />
              Record New Hike Entry
            </h2>
            <Form onSubmit={handleCreateFormSubmit}>
              <div className="container text-start">
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
              <Button variant="success" type="submit" className="mt-3">
                Record Hike
              </Button>
            </Form>
            <div className="row justify-content-center my-3">
              <div className="col-sm-7">
                {alertText && <Alert variant={alertType}>{alertText}</Alert>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordHike;
