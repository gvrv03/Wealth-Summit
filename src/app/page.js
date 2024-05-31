"use client";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import { DefaultBTN } from "@/Components/Home/Utility/Utility";
import { subscribeURL } from "@/helper/allLinks";
import axios from "axios";
import AllProductComC from "./Products/page";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(subscribeURL, { email: email });
      const data = res?.data;
      if (data.isSuccess) {
        return toast.success(data?.message);
      }
      return toast.error(data?.error);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <section className="bgPattern">
      <div class=" container  m-auto text-white body-font">
        <ResponsiveAppBar shadow=" " position="fixed" />

        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            class=" md:w-60 w-48 mb-10 object-cover object-center rounded-full"
            alt="hero"
            src="/logo.jpg"
          />
          <div class="text-center lg:w-2/3 w-full">
            <h2 className="font-semibold  text-2xl py-5 text-gray-200">
              Money x Luxuary{" "}
            </h2>
            <p className="text-gray-400">
              We provide a wide range of digital resources designed to enhance
              your life and contribute to your overall well-being and
              prosperity. Our offerings are tailored to help you achieve
              financial success, improve your knowledge, and streamline your
              daily activities, ensuring that you can lead a more productive,
              fulfilling, and wealthy life.
            </p>
            <div class=" mt-5 flex justify-center gap-5">
              <input
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                placeholder="Ex. joejordan@gmail.com"
                className=" px-5  w-full bg-ground border border-gray-700 "
              />
              <DefaultBTN
                name="Subscribe"
                clickHandle={handleSubscribe}
                loading={loading}
                styleCSS=" border border-gray-700 bg-ground inline-flex text-white bg-indigo-500  py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
