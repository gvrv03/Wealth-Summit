"use client";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import { DefaultBTN } from "@/Components/Home/Utility/Utility";
import { subscribeURL } from "@/helper/allLinks";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const HomePage = () => {
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
  const router = useRouter();
  return (
    <section className="bgPattern ">
      <div className=" container  m-auto text-white body-font">
        <ResponsiveAppBar shadow=" " position="fixed" />

        <div className="container mx-auto flex px-5 min-h-[90vh]    items-center justify-center flex-col">
          <Image
            className=" md:w-60 w-48 mb-10 object-cover object-center rounded-full"
            alt="hero"
            width={100}
            height={100}
            loading="lazy"
            src="/logo.jpg"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h2 className="font-semibold  text-2xl py-5 text-gray-200">
              Money x Luxury{" "}
            </h2>
            <p className="text-gray-400">
              We provide a wide range of digital resources designed to enhance
              your life and contribute to your overall well-being and
              prosperity.
            </p>
            <form
              onSubmit={handleSubscribe}
              className=" mt-5 flex justify-center border border-gray-700 "
            >
              <input
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required={true}
                placeholder="Ex. joejordan@gmail.com"
                className=" px-5  w-full  outline-none bg-ground  "
              />
              <DefaultBTN
                name="Subscribe"
                loading={loading}
                styleCSS="  bg-ground inline-flex text-white bg-indigo-500  py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              />
            </form>
          </div>
          <DefaultBTN
            clickHandle={() => {
              router.push("/Products");
            }}
            name="View Products"
            styleCSS="px-5 mt-5 font-semibold  rounded-sm md:rounded-md"
          />{" "}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
