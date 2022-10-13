import axios from "axios";

const getMountains = async (token: string) => {
  const response = await axios.get("/mountains", {
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
