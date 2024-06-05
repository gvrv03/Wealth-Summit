import InvoiceTemp from "@/Components/Home/Utility/InvoiceTemp";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import initDB from "@/helper/initDB";
import Order from "@/Modal/Order";
import React from "react";

const SuccessPage = async ({ searchParams }) => {
  initDB()
  const res = await Order.findOne({ TID: searchParams?.TID }).populate(
    "Product"
  );

  if (!res) {
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

  const { Name, Email } = res;

  return (
   <InvoiceTemp Name={Name} Email={Email} TID={searchParams?.TID}  />
  );
};

export default SuccessPage;
