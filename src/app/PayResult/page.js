import InvoiceTemp from "@/Components/Home/Utility/InvoiceTemp";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import { phonepeInvoiceURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";

const SuccessPage = async ({ searchParams }) => {
  const res = await axios.get(phonepeInvoiceURL + searchParams?.TID);
  if (!res?.data?.isSuccess) {
    return (
      <section className="bgPattern ">
        <div className="container m-auto">
          <ResponsiveAppBar shadow=" " position="fixed" />
        </div>{" "}
        <div className="  p-5 container gap-5  m-auto flex h-[80vh] flex-col justify-center items-center text-white body-font">
          <div className=" font-semibold uil uil-times text-6xl border rounded-full  w-20 h-20 grid place-items-center bg-ground" />
          <div className="text-2xl text-center font-semibold">
            We’re sorry, but your payment could not be processed
          </div>
        </div>
      </section>
    );
  }

  const { Name, Email } = res?.data?.data;

  return <InvoiceTemp Name={Name} Email={Email} TID={searchParams?.TID} />;
};

export default SuccessPage;
