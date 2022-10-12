import RecordHike from "../RecordHike";
import { render, screen, fireEvent } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import * as hike from "../../context/HikeContext";
import * as mountain from "../../context/MountainContext";
import * as auth from "../../context/AuthContext";
import {
  test_hikes_with_duplicates,
  test_mountain_data,
} from "../../utils/test_data";
import { Status } from "../../@types/hike";

describe("RecordHike component testing", () => {
  it("should change the alert text is status is SUCCESS", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.SUCCESS,
    }));
    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(
      screen.getByText("Successfully added hike to your journal!")
    ).toBeInTheDocument();
  });

  it("should change the alert text is status is FAILED", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "Failed test",
      loadingHikes: false,
      status: Status.FAILED,
    }));
    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Failed test")).toBeInTheDocument();
  });

  it("should change the alert text is status is PENDING", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.PENDING,
    }));
    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Adding new hike")).toBeInTheDocument();
  });

  it("should change the alert text is status is missing", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
    }));
    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Status is required")).toBeInTheDocument();
  });

  it("should render the mountain names as options in the forms select list", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.PENDING,
    }));
    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("Algonquin Peak")).toBeInTheDocument();
  });

  it("should navigate to login if no token present", () => {
    localStorage.removeItem("token");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));
    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(global.window.location.href).toContain("/login");
  });

  it("should call the handle change functions when input changes", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));

    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    const hikers = screen.getByPlaceholderText("Who went on the hike?");
    fireEvent.change(hikers, { target: { value: "Jason" } });
    expect(hikers).toHaveValue("Jason");
    const date = screen.getByLabelText("Hike Date");
    fireEvent.change(date, { target: { value: "2022-10-10" } });
    expect(date).toHaveValue("2022-10-10");
    const weather = screen.getByPlaceholderText("What was the weather?");
    fireEvent.change(weather, { target: { value: "Sunny" } });
    expect(weather).toHaveValue("Sunny");
    const report = screen.getByPlaceholderText("What happened on the hike?");
    fireEvent.change(report, { target: { value: "Test report" } });
    expect(report).toHaveValue("Test report");
    const mtnName = screen.getByLabelText("Mountain");
    fireEvent.change(mtnName, { target: { value: "Gothics" } });
    expect(mtnName).toHaveValue("Gothics");
  });

  it("should submit the form if the record button is clicked", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.SUCCESS,
    }));
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    const hikers = screen.getByPlaceholderText("Who went on the hike?");
    fireEvent.change(hikers, { target: { value: "Jason" } });
    const date = screen.getByLabelText("Hike Date");
    fireEvent.change(date, { target: { value: "2022-10-10" } });
    const weather = screen.getByPlaceholderText("What was the weather?");
    fireEvent.change(weather, { target: { value: "Sunny" } });
    const report = screen.getByPlaceholderText("What happened on the hike?");
    fireEvent.change(report, { target: { value: "Test report" } });
    const mtnName = screen.getByLabelText("Mountain");
    fireEvent.change(mtnName, { target: { value: "Gothics" } });
    const recordBtn = screen.getByText("Record Hike");
    fireEvent.click(recordBtn);
    expect(
      screen.getByText("Successfully added hike to your journal!")
    ).toBeInTheDocument();
  });

  it("should alert the user that hikers are required to submit if input is empty", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );

    const recordBtn = screen.getByText("Record Hike");
    fireEvent.click(recordBtn);
    expect(screen.getByText("Hikers are required")).toBeInTheDocument();
  });

  it("should alert the user that weather is required to submit if input is empty", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    const hikers = screen.getByPlaceholderText("Who went on the hike?");
    fireEvent.change(hikers, { target: { value: "Jason" } });
    const date = screen.getByLabelText("Hike Date");
    fireEvent.change(date, { target: { value: "2022-10-10" } });
    const recordBtn = screen.getByText("Record Hike");
    fireEvent.click(recordBtn);
    expect(
      screen.getByText("Weather description is required")
    ).toBeInTheDocument();
  });

  it("should alert the user that trip report is required to submit if input is empty", () => {
    localStorage.setItem("token", "test");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: { id: "test", username: "Test Name", email: "test@email.com" },
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    const hikers = screen.getByPlaceholderText("Who went on the hike?");
    fireEvent.change(hikers, { target: { value: "Jason" } });
    const date = screen.getByLabelText("Hike Date");
    fireEvent.change(date, { target: { value: "2022-10-10" } });
    const recordBtn = screen.getByText("Record Hike");
    const weather = screen.getByPlaceholderText("What was the weather?");
    fireEvent.change(weather, { target: { value: "Sunny" } });
    fireEvent.click(recordBtn);
    expect(
      screen.getByText("Trip report description is required")
    ).toBeInTheDocument();
  });

  it("should not submit if there is no current user / no token", () => {
    localStorage.removeItem("token");
    jest.spyOn(mountain, "useMountainState").mockImplementation(() => ({
      mountains: test_mountain_data,
      errorMountains: "",
      loadingMountains: false,
    }));
    jest.spyOn(hike, "useHikeState").mockImplementation(() => ({
      hikes: test_hikes_with_duplicates,
      errorHikes: "",
      loadingHikes: false,
      status: Status.IDLE,
    }));
    jest.spyOn(auth, "useAuthState").mockImplementation(() => ({
      user: null,
      loading: false,
      error: "",
      message: "",
    }));

    render(
      <Router>
        <RecordHike />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/login" element={<h1 />} />
          <Route path="/register" element={<h1 />} />
        </Routes>
      </Router>
    );
    const hikers = screen.getByPlaceholderText("Who went on the hike?");
    fireEvent.change(hikers, { target: { value: "Jason" } });
    const date = screen.getByLabelText("Hike Date");
    fireEvent.change(date, { target: { value: "2022-10-10" } });
    const recordBtn = screen.getByText("Record Hike");
    const weather = screen.getByPlaceholderText("What was the weather?");
    fireEvent.change(weather, { target: { value: "Sunny" } });
    const report = screen.getByPlaceholderText("What happened on the hike?");
    fireEvent.change(report, { target: { value: "Test report" } });
    fireEvent.click(recordBtn);
    expect(screen.getByText("No active user")).toBeInTheDocument();
  });
});
