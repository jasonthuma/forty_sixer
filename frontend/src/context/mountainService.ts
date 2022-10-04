import axios from "axios";
import { IMountain } from "../@types/mountain";

const mountainApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllMountains = async () => {
  const response = await mountainApi.get("/mountains");
  return response.data;
};

const getMountainById = async (id: string) => {
  const response = await mountainApi.get("/mountains/" + id);
};

const mountainService = {
  getAllMountains,
  getMountainById,
};

export default mountainService;
