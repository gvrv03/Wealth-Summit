"use client";
import { useUserAuth } from "@/Context/UserAuthContext";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { DefaultBTN } from "../Utility/Utility";

const SignUpCom = () => {
  const [userOTP, setuserOTP] = useState("");
  const [loading, setloading] = useState(false);
  const [phoneNo, setphoneNo] = useState("");
  const {
    otpSend,
    isUserExist,
    createNewUser,
    timer,
    isTimerRunning,
    resendOTP,
  } = useUserAuth();

  const [userData, setuserData] = useState({
    gender: "male",
    name: "",
    email: "",
    dob: "",
  });
  const [password, setpassword] = useState("");
  function onChange(e) {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const sendOTPtoUser = async (e) => {
    e.preventDefault();
    setloading(true);
    if (phoneNo.length < 9) {
      toast.error("Enter the number");
      return setloading(false);
    }
    await isUserExist(91 + phoneNo, userData.email);
    return setloading(false);
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    setloading(true);
    if (!userOTP) {
      toast.error("Enter the OTP");
      return setloading(false);
    }
    await createNewUser(parseInt(userOTP), phoneNo, userData, password);
    return setloading(false);
  };

  return (
    <div className=" w-full  grid place-items-center p-5">
      <form
        onSubmit={!otpSend ? sendOTPtoUser : verifyOTP}
        method="POST"
        className="w-full md:w-[500px] flex gap-2 flex-col md:p-5   "
      >
        <h2 className="font-semibold hidden md:block">Sign Up</h2>
        <div className="    outline-none  bg-secondary flex gap-2">
          <select
            onChange={onChange}
            value={userData.gender}
            required={true}
            className="bg-secondary"
            name="gender"
          >
            <option value="Male">Mr</option>
            <option value="Female">Mrs</option>
          </select>
          <input
            type="text"
            required={true}
            onChange={onChange}
            value={userData.name}
            name="name"
            placeholder="Name"
            className=" outline-none  bg-secondary w-full  p-2"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="   outline-none  bg-secondary w-full  p-2"
          onChange={onChange}
          value={userData.email}
          required={true}
          name="email"
        />

        <input
          type="date"
          placeholder="Date of birth"
          className="   outline-none  bg-secondary w-full  p-2"
          onChange={onChange}
          required={true}
          value={userData.dob}
          name="dob"
        />

        <input
          type="password"
          placeholder="Password"
          className="   outline-none  bg-secondary w-full  p-2"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          value={password}
          required={true}
          name="password"
        />

        <input
          type="number"
          maxLength="10"
          placeholder="Phone No."
          className="   outline-none  bg-secondary w-full  p-2"
          onChange={(e) => {
            setphoneNo(e.target.value);
          }}
          value={phoneNo}
          required={true}
          name="phoneNo"
        />
        {otpSend && (
          <>
            <input
              type="number"
              onChange={(e) => {
                setuserOTP(e.target.value);
              }}
              placeholder="Enter OTP"
              className="   outline-none  bg-secondary w-full  p-2"
            />
            <div className="w-full">
              <button
                type="button"
                onClick={async () => {
                  await resendOTP(phoneNo);
                }}
                disabled={isTimerRunning ? true : false}
                className="text-sm text-blue-800 font-semibold  float-right py-2"
              >
                Reset OTP in : {timer}s
              </button>
            </div>

            <DefaultBTN loading={loading} name="Sign Up" />
          </>
        )}
        <p className=" text-gray-500  py-2 text-xs">
          By Create an account, I accept the{" "}
          <Link href="/" className="text-xs w-full font-semibold text-blue-700">
            Terms & Conditions
          </Link>{" "}
          &{" "}
          <Link
            href="/Auth/Login"
            className="text-xs w-full font-semibold text-blue-700"
          >
            Privacy Policy
          </Link>
        </p>

        {!otpSend && <DefaultBTN loading={loading} name="Send OTP" />}
        <p className=" text-gray-500 text-center text-xs">
          If you Already have an account ?{" "}
          <Link
            href="/Auth/Login"
            className="text-xs w-full font-semibold text-blue-700"
          >
            Sign In
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};
export default SignUpCom;
