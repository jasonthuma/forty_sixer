import Hike from "../Hike";
import * as hike from "../../context/HikeContext";
import * as mountain from "../../context/MountainContext";
import * as auth from "../../context/AuthContext";

import { render, screen, fireEvent } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import {
  test_mountain_data,
  test_hikes_with_duplicates,
} from "../../utils/test_data";
import { IHike, Status } from "../../@types/hike";

describe("Hike component testing", () => {
  it("should render with the given hike information", () => {
    const hike: IHike = test_hikes_with_duplicates[0];
    render(
      <Router>
        <Hike hike={hike} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText("2019-10-10")).toBeInTheDocument();
    expect(screen.getByText("Hikers: Test1, Test2")).toBeInTheDocument();
  });

  it("should show the update modal if the update button is clicked", () => {
    const hike: IHike = test_hikes_with_duplicates[0];
    render(
      <Router>
        <Hike hike={hike} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );
    const updateBtn = screen.getByText("Update");
    expect(updateBtn).toBeInTheDocument();
    fireEvent.click(updateBtn);
    expect(screen.getAllByText("Update Hike")[0]).toBeInTheDocument();
  });

  it("should call the handle change functions when input changes", () => {
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
        <Hike hike={test_hikes_with_duplicates[1]} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    const hikers = screen.getByLabelText("Hikers");
    fireEvent.change(hikers, { target: { value: "Jason" } });
    expect(hikers).toHaveValue("Jason");
    const date = screen.getByLabelText("Hike Date");
    fireEvent.change(date, { target: { value: "2022-10-10" } });
    expect(date).toHaveValue("2022-10-10");
    const weather = screen.getByLabelText("Weather");
    fireEvent.change(weather, { target: { value: "Sunny" } });
    expect(weather).toHaveValue("Sunny");
    const report = screen.getByLabelText("Trip Report");
    fireEvent.change(report, { target: { value: "Test report" } });
    expect(report).toHaveValue("Test report");
    const mtnName = screen.getByLabelText("Mountain");
    fireEvent.change(mtnName, { target: { value: "Gothics" } });
    expect(mtnName).toHaveValue("Gothics");
  });

  it("should call the delete function when the delete button is clicked", () => {
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
        <Hike hike={test_hikes_with_duplicates[1]} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);
    expect(screen.getByText("Hike was deleted")).toBeInTheDocument();
  });

  it("should alert the user that hikers are required to update if input is empty", () => {
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
        <Hike hike={test_hikes_with_duplicates[1]} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    const hikers = screen.getByLabelText("Hikers");
    fireEvent.change(hikers, { target: { value: "" } });
    const submitUpdateBtn = screen.getByText("Update Hike");
    fireEvent.click(submitUpdateBtn);
    expect(screen.getByText("Hikers are required")).toBeInTheDocument();
  });

  it("should alert the user that weather is required to update if input is empty", () => {
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
        <Hike hike={test_hikes_with_duplicates[1]} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    const weather = screen.getByPlaceholderText("What was the weather?");
    fireEvent.change(weather, { target: { value: "" } });
    const submitUpdateBtn = screen.getByText("Update Hike");
    fireEvent.click(submitUpdateBtn);
    expect(
      screen.getByText("Weather description is required")
    ).toBeInTheDocument();
  });

  it("should alert the user that trip report is required to update if input is empty", () => {
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
        <Hike hike={test_hikes_with_duplicates[1]} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    const report = screen.getByPlaceholderText("What happened on the hike?");
    fireEvent.change(report, { target: { value: "" } });
    const submitUpdateBtn = screen.getByText("Update Hike");
    fireEvent.click(submitUpdateBtn);
    expect(
      screen.getByText("Trip report description is required")
    ).toBeInTheDocument();
  });

  it("should call the update function when the update hike button is clicked", () => {
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
        <Hike hike={test_hikes_with_duplicates[1]} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    const report = screen.getByPlaceholderText("What happened on the hike?");
    fireEvent.change(report, { target: { value: "New Report" } });
    const submitUpdateBtn = screen.getByText("Update Hike");
    fireEvent.click(submitUpdateBtn);
    expect(screen.getByText("Updated Successfully!")).toBeInTheDocument();
  });

  it("should alert no active user when the update hike button is clicked if no user / token", () => {
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
        <Hike hike={test_hikes_with_duplicates[1]} />
        <Routes>
          <Route path="/" element={<h1 />} />
          <Route path="/record" element={<h1 />} />
        </Routes>
      </Router>
    );

    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    const report = screen.getByPlaceholderText("What happened on the hike?");
    fireEvent.change(report, { target: { value: "New Report" } });
    const submitUpdateBtn = screen.getByText("Update Hike");
    fireEvent.click(submitUpdateBtn);
    expect(screen.getByText("No active user")).toBeInTheDocument();
  });
});
