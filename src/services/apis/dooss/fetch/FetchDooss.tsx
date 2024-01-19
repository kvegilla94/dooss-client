import axios from "axios";
const FetchDooss = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown
) => {
  const response = await axios({
    url: endpoint,
    method,
    baseURL: "http://localhost:3000/", // get from config
    data,
  });

  return response;
};

export default FetchDooss;
