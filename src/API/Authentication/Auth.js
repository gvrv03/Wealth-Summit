import axios from "axios";
import {
  checkUserExistURL,
  checkUserURL,
  RegisterUserURL,
  Fast2SMSURL,
  SendSMSToUserURL,
  signInUserURL,
  getUsersURL,
  getUserRole,
} from "@/helper/allLinks";

//------------------Fetch Users------------------
export const fetchUsersAPI = async (data) => {
  const page = data?.page ? data?.page : 1;
  const limit = data?.limit ? data?.limit : 10;
  const queryObj = data?.queryObj ? data?.queryObj : {};
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const url =
    getUsersURL +
    `?page=${page}&limit=${limit}&query=${JSON.stringify(queryObj)}`;
  const res = await axios.get(url, { headers });
  return await res?.data;
};

//------------------Send Via Fast 2 SMS------------------
export const Fast2SMSSend = async (phoneNo, OTP) => {
  const url = Fast2SMSURL;
  const data = {
    variables_values: OTP,
    route: "otp",
    numbers: phoneNo,
  };
  const headers = {
    authorization: process.env.FAST2SMSAPI,
    "Content-Type": "application/json",
  };
  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

//------------------Send Via API------------------
export const SendSMSToUser = async (number) => {
  const url = SendSMSToUserURL;
  const res = await axios.post(url, { phoneNo: number });
  return await res?.data;
};

//------------------Sign in User------------------
export const SignIn = async (email, password) => {
  const url = signInUserURL;
  const res = await axios.post(url, { email, password });
  return await res?.data;
};

//------------------Update User------------------
export const UpdateUser = async (userData) => {
  const url = RegisterUserURL;
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const res = await axios.put(url, { userData }, { headers });
  return await res?.data;
};

//------------------Check ser Exists------------------
export const checkUserExists = async (number, email) => {
  const url = checkUserExistURL;
  const res = await axios.post(url, { phoneNo: number, email });
  return await res?.data;
};

//------------------Create new User------------------
export const createUser = async (number, hash, OTP, userData, password) => {
  const url = RegisterUserURL;
  const dataUser = {
    phoneNo: number,
    hash: hash,
    OTP: OTP,
    userData: userData,
    password: password,
  };
  const res = await axios.post(url, dataUser);
  return await res?.data;
};

//------------------Check User------------------
export const checkUser = async () => {
  const url = checkUserURL;
  const dataUser = {
    token: localStorage.getItem("token"),
  };
  const res = await axios.post(url, dataUser);
  return await res?.data;
};

// ------------------Get User Role-------------
export const getUser = async (id) => {
  const url = getUserRole;
  const res = await axios.get(`${url}?id=${id}`);
  const data = await res?.data;
  return data;
};

export const updateURole = async (userData) => {
  const url = getUserRole;
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const res = await axios.post(url, userData, { headers });
  const data = await res?.data;
  return data;
};
