import { contactURL } from "@/helper/allLinks";
import axios from "axios";

export const AddConatctAPI = async (data) => {
  const response = await axios.post(contactURL, data);
  return await response?.data;
};
