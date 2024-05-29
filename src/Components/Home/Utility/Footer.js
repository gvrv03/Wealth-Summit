"use client";
import { LeagalNav } from "@/SampleData/Nav";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();
  return (
    <>
      <div className="container md:flex-row flex-col gap-5 items-center flex justify-between m-auto p-5">
        <div className="flex md:flex-row flex-col justify-center items-center gap-5">
          <Image
            src="/logo.jpg"
            className="  rounded-full"
            width={50}
            height={50}
          />
          <h2 className="font-semibold">Wealth Summit </h2>
        </div>
        <div className="flex gap-5 text-gray-400 ">
          {LeagalNav?.map((item, index) => {
            return (
              <button
                onClick={() => {
                  router.push(item?.location);
                }}
                key={index}
                className={` ${item?.icon} uil flex items-center gap-2 hover:text-white hover:font-semibold`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Footer;
