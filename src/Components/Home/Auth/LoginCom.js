"use client";
import { useUserAuth } from "@/Context/UserAuthContext";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import Spinner from "../Utility/Spinner";
import { DefaultBTN } from "../Utility/Utility";

const LoginCom = () => {
  const { signInUser } = useUserAuth();
  const [loading, setloading] = useState(false);

  return (
    <div className=" w-full  grid place-items-center p-5">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setloading(true);
          const formData = new FormData(e.currentTarget);
          const { email, password } = Object.fromEntries(formData.entries());
          await signInUser(email, password);
          setloading(false);
        }}
        className="w-full md:w-[500px] flex  gap-2 flex-col md:p-5   "
      >
        <h2 className="font-semibold md:block hidden">Sign In</h2>
        <input
          type="text"
          placeholder="Email"
          className="   outline-none bg-secondary w-full  p-2"
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="   outline-none bg-secondary w-full  p-2"
          name="password"
        />
        <Link
          href="/"
          className="text-sm font-semibold flex justify-end w-full  py-2 text-blue-700"
        >
          Forgot password ?
        </Link>

        <DefaultBTN loading={loading} name="Sign In" />

        <p className=" text-gray-500 text-center text-xs">
          If you dont have an account ?{" "}
          <Link
            href="/Auth/SignUp"
            className="text-xs w-full font-semibold text-blue-700"
          >
            Create an Account
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};
export default LoginCom;
