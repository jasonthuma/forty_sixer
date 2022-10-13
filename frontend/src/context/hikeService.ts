import axios from "axios";
import { NewHike, UpdateHike } from "../@types/hike";

const getHikes = async (token: string) => {
  const response = await axios.get("/hikes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const create = async (newHike: NewHike, token: string) => {
  const response = await axios.post("/hikes", newHike, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const update = async (
  updateHike: UpdateHike,
  hikeId: string,
  token: string
) => {
  const response = await axios.put("/hikes/" + hikeId, updateHike, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteHike = async (hikeId: string, token: string) => {
  const response = await axios.delete("/hikes/" + hikeId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const hikeService = {
  getHikes,
  create,
  update,
  deleteHike,
};

export default hikeService;
