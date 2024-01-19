import FetchDooss from "../fetch/FetchDooss";

export const getBookings = async () => {
  return await FetchDooss("user", "GET");
};
