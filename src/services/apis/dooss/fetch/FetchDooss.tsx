import axios from "axios";

export type Booking = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  dentist: string | undefined;
  appointmentType: string | undefined;
  date: Date | undefined;
  time: string | undefined;
};

const FetchDooss = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: unknown
) => {
  const response = await axios({
    url: endpoint,
    method,
    baseURL: "http://localhost:3000/",
    data,
  });

  return response;
};

export default FetchDooss;
