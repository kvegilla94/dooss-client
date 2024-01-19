import FetchDooss, { Booking } from "../fetch/FetchDooss";

export const getBookings = async () => {
  return await FetchDooss("user", "GET");
};

export const createBooking = async (booking: Booking) => {
  return await FetchDooss("booking", "POST", booking);
};
