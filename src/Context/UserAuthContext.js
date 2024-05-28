"use client";
import { useCallback, useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  checkAuthorized,
  checkUser,
  checkUserExists,
  createUser,
  fetchUsersAPI,
  SendSMSToUser,
  SignIn,
  UpdateUser,
} from "@/API/Authentication/Auth";
import { toast } from "react-hot-toast";
import { useAppStore } from "./UseStoreContext";
const userAuthContext = createContext();
export function UserAuthContexProvider({ children }) {
  const { setuserDetails } = useAppStore();
  const [otpSend, setotpSend] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [OTPHash, setOTPHash] = useState("");
  //----------------------------All Blogs State //----------------------------
  const [usersAll, setUsersAll] = useState({
    data: [],
    isLoading: true,
    error: null,
    count: 0,
    totalPages: 0,
  });

  //-------------------SEND SMS to User -------------------
  const sendSMS = async (number) => {
    const res = await SendSMSToUser(number.slice(2));
    if (res?.isSuccess) {
      setOTPHash(res?.hash);
      setotpSend(true);
      startTimer();
      return toast.success(res?.message);
    }
    return toast.error(res?.message);
  };

  //------------------Check User Exists------------------
  const isUserExist = async (phone, email) => {
    try {
      const response = await checkUserExists(phone, email);
      if (response?.isUnique) {
        return await sendSMS(phone);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //------------------Sign In User------------------
  const signInUser = async (email, password) => {
    try {
      const response = await SignIn(email, password);
      if (response?.isSuccess) {
        localStorage.setItem("token", response?.token);
        localStorage.setItem("id", response?.userID);
        localStorage.setItem("userRole", response?.userRole);
        await fetchUserDetail(response?.token);
        return toast.success(response?.message);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //-------------------Sign Out User -------------------
  const signOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("id");
    setuserDetails({});
  };

  //-------------------To start Timer-------------------
  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(59);
  };

  //-------------------Create A User -------------------
  const createNewUser = async (userOTP, number, userData, password) => {
    try {
      const res = await createUser(
        number,
        OTPHash,
        userOTP,
        userData,
        password
      );
      if (res?.isSuccess) {
        localStorage.setItem("token", res?.token);
        localStorage.setItem("id", res?.userID);
        localStorage.setItem("userRole", res?.userRole);
        await fetchUserDetail();
        setotpSend(false);
        return toast.success(res?.message);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //-------------------Update A User -------------------
  const updateUserDetail = async (userData) => {
    try {
      const res = await UpdateUser(userData);
      if (res?.isSuccess) {
        await fetchUserDetail();
        return toast.success(res?.message);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //-------------------Resend OTP-------------------
  const resendOTP = async (number) => {
    await sendSMS(number);
  };

  // console.log(userDetails);
  //-------------------get User detail -------------------
  const fetchUserDetail = useCallback(async () => {
    try {
      const res = await checkUser();
      localStorage.setItem("id", res?.User?._id);
      localStorage.setItem("userRole", res?.User?.role);
      setuserDetails({ ...res });
    } catch (error) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full  bg-gray-950  shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/img/maleUser.svg"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1 ">
                <p className="mt-1 text-sm text-gray-500">
                  Hey, <span>User</span>
                </p>{" "}
                <p className="mt-1 text-sm text-gray-500">
                  You need To Login Again
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            
            <button
              onClick={() => {
                signOut();
                toast.dismiss(t.id);
              }}
              className="w-full  border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </div>
      ));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserDetail();
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // -------------------Fetch Users----------------
  const fetchUsersAll = async (data) => {
    try {
      setUsersAll({
        data: [],
        isLoading: true,
        error: null,
        count: 0,
        totalPages: 0,
      });
      const usersData = await fetchUsersAPI(data);
      return setUsersAll({
        data: usersData?.users,
        isLoading: false,
        count: usersData?.usersCount,
        totalPages: usersData?.totalPages,
      });
    } catch (error) {
      setUsersAll({
        data: [],
        isLoading: false,
        count: 0,
        error: error.message,
        totalPages: 0,
      });
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };
  return (
    <userAuthContext.Provider
      value={{
        sendSMS,
        otpSend,
        timer,
        isTimerRunning,
        signOut,
        resendOTP,
        createNewUser,
        isUserExist,
        signInUser,
        updateUserDetail,
        usersAll,
        setUsersAll,
        fetchUsersAll,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
