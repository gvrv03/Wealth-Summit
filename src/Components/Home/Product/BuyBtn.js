"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";
import CountdownTimer from "../Utility/CountDownTimer";

const BuyBtn = ({ product }) => {
  const { setisBuyingOpen, setcurBuyPID } = useAppStore();
  return (
    <>
    <button
      onClick={() => {
        setisBuyingOpen(true);
        setcurBuyPID(product);
      }}
      className=" uil bg-[#ffe100] text-black uil-shopping-cart flex items-center gap-2 font-semibold justify-center   w-full p-4 rounded-sm md:rounded-md "
    >
      Buy This
    </button>
    <CountdownTimer/>
    </>
  );
};

export default BuyBtn;
