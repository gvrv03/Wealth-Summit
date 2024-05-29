import { getOrderURL, getUserOrderURL } from "@/helper/allLinks";
import axios from "axios";

export const getOrder = async (data) => {
  const page = data?.page ?? 1;
  const limit = data?.limit ?? 10;
  const queryObj = data?.queryObj ?? {};

  const url =
    getUserOrderURL +
    `?page=${page}&limit=${limit}&query=${JSON.stringify(queryObj)}`;
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const response = await axios.get(url, { headers });

  return await response?.data;
};

export const getUserOrderAPI = async (data) => {
  const page = data?.page ?? 1;
  const limit = data?.limit ?? 10;

  const url = getUserOrderURL + `?page=${page}&limit=${limit}`;
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const response = await axios.get(url, { headers });

  return await response?.data;
};
