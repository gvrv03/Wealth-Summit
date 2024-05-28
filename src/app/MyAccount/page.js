"use client";
import ProfileComp from "@/Components/Home/MyAccount/Profile/ProfileComp";
import SideDrawerAcc from "@/Components/Home/MyAccount/SideDrawerAcc";
import React from "react";

const page = () => {
  return (
    <>
      <div className="block md:hidden">
        {" "}
        <SideDrawerAcc />{" "}
      </div>
      <div className="md:block hidden">
        <ProfileComp />
      </div>
    </>
  );
};

export default page;
