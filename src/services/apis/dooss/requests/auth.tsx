import FetchDooss from "../fetch/FetchDooss";

export const generateOtp = async (data: { email: string }) => {
  const response = await FetchDooss(`auth/generateOtp`, "POST", data);
  return response.data;
};

export const login = async (data: { email: string; otp?: string }) => {
  const response = await FetchDooss(`auth/login`, "POST", data);
  return response.data;
};
