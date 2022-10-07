import axios from "axios";

const mountainApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const getMountains = async (token: string) => {
  const response = await mountainApi.get("/mountains", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const mountainService = {
  getMountains,
};

export default mountainService;
