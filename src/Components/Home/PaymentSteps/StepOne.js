"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import { phonepePayURL } from "@/helper/allLinks";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { DefaultBTN } from "../Utility/Utility";

const StepOne = ({ pID, pPrice }) => {
  const [curPayUser, setcurPayUser] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcurPayUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const router = useRouter();
  const [loading, setloading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      if (!curPayUser?.name || !curPayUser?.email) {
        return toast.error("Fill all the fields");
      }
      const res = await axios.post(phonepePayURL, {
        name: curPayUser?.name,
        email: curPayUser?.email,
        amount: pPrice,
        product: pID,
      });
      return router.push(res?.data?.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <form className="md:fixed md:w-[425px] md:mt-10 bg-ground  md:border md:p-5 border-gray-700 rounded-none items-center flex-col flex gap-5">
      <p className="font-semibold w-full ">Payment Details</p>
      <input
        type="text"
        required={true}
        name="name"
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-700 outline-none bg-ground rounded-sm md:rounded-none"
        placeholder="Ex. Joe jordan"
      />
      <input
        name="email"
        required={true}
        onChange={handleInputChange}
        type="email"
        className="w-full p-2 border border-gray-700 outline-none bg-ground rounded-sm md:rounded-none"
        placeholder="Ex. joejordan@gmail.com"
      />

      <div className=" bg-secondary p-5 w-full">
        <p className="font-semibold">Amount Total</p>
        <p>₹{pPrice}</p>
      </div>

      <DefaultBTN
        clickHandle={handlePay}
        name="Pay Now"
        loading={loading}
        styleCSS="px-5  w-full   font-semibold  rounded-sm md:rounded-none"
      />
      <div className="  p-5 w-full">
        <p className="font-medium text-sm text-center">
          Guaranteed safe & secure payment
        </p>
        <div className="flex gap-2 items-center justify-center mt-5">
          <img
            className="w-10"
            src="https://cosmofeed.com/_next/static/media/visa.ffd2922c.png"
          />
          <img
            className="w-10"
            src="https://cosmofeed.com/_next/static/media/gpay.4847e60d.png"
          />
          <img
            className="w-10"
            src="https://cosmofeed.com/_next/static/media/mastercard.f39148e5.png"
          />
          <img
            className="w-10"
            src="https://cosmofeed.com/_next/static/media/phonepay.ee83f3f6.png"
          />
          <img
            className="w-10"
            src="https://cosmofeed.com/_next/static/media/paytm.0d7e29d2.png"
          />
        </div>
      </div>
    </form>
  );
};

export default StepOne;
