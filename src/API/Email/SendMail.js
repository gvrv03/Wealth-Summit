import { sendEmailURL } from "@/helper/allLinks";
import axios from "axios";

export const SendEmailAPI = async (data) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  try {
    const response = await axios.post(sendEmailURL, data, { headers });
    return await response?.data;
  } catch (error) {
    return { error: error.message };
  }
};
