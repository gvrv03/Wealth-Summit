"use client";
import RazorpayBTN from "@/Components/Home/Utility/RazorpayBTN";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import { useAppStore } from "@/Context/UseStoreContext";
import { useRouter } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }) => {
  const { userDetails } = useAppStore();
  const router = useRouter();

  if (userDetails?.isLogin) {
    setTimeout(() => {
      router.push("/");
    }, 100);
  }
  return (
    <div className="container m-auto">
      <ResponsiveAppBar position="fixed" />
      {children}
      <div className="grid place-items-center">
        <RazorpayBTN paymentID="pl_O5EV6jX71yOW9B" />
      </div>{" "}
    </div>
  );
};

export default AuthLayout;
