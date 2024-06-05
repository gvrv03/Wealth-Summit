"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import Link from "next/link";
import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { DefaultBTN } from "./Utility";

const InvoiceTemp = ({ Name, Email, TID }) => {
  const { handleGeneratePDF, reportTemplateRef, download } = useAppStore();
  return (
    <section className=" ">
      <div className="container grid place-items-center m-auto">
        <ResponsiveAppBar shadow=" " position="fixed" />
        <DefaultBTN
          loading={download}
          name="Download Invoice"
          clickHandle={handleGeneratePDF}
          styleCSS="border bg-ground text-white  border-gray-700 p-2  px-5 rounded-md m-5"
        />
      </div>{" "}
      <div className="p-5">
        <div
          ref={reportTemplateRef}
          className="bg-ground   border-gray-700 border  container gap-5  m-auto flex h-[80vh] flex-col justify-center items-center text-white body-font"
        >
          <div className=" font-semibold uil uil-check text-6xl border rounded-full  w-20 h-20 grid place-items-center bg-ground" />
          <div className="text-2xl font-bold text-center ">
            Thank you!
            <br />
            Your payment was successful
          </div>
          <div>
            <div className="text-sm  font-semibold text-center ">{Name}</div>
            <div className="text-sm  text-center ">{Email}</div>
          </div>
          <h5>{TID} </h5>

          <p className="text-sm">
            Your digital product is now available to access check your email
          </p>

          <div className="flex-col flex gap-2 items-center justify-center">
            <h2 className="text-2xl font-semibold">Contact & Support</h2>
            <p className="uil uil-envelop text-xs ">
              wealthsummit@wealthsummit.shop
            </p>
            <Link
              href="/ContactUs"
              target="_blank"
              className="border px-5 py-2 rounded-md mt-2 border-gray-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceTemp;
