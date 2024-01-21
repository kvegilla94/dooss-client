import FetchDooss, { Booking } from "../fetch/FetchDooss";

export const getBookingsByUser = async (userId: number) => {
  const response = await FetchDooss(`user/${userId}`, "GET");
  return response.data;
};

export const createBooking = async (booking: Booking) => {
  const response = await FetchDooss("booking", "POST", booking);
  return response.data;
};

export const getBookingDetails = async (bookingId: number) => {
  const response = await FetchDooss(`booking/${bookingId}`, "GET");
  return response.data;
};
