"use client"
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({
  description,
  thumbnail,
  title,
  price,
  comPrice,
  views,
  id,
}) => {
  const router = useRouter();

  return (
    <div
      className="border  flex-col flex justify-between
    border-gray-800 rounded-sm shadow-md md:rounded-md bg-ground p-5"
    >
      <div>
        <img src={thumbnail} alt="" srcset="" />
        <h2 className="font-semibold  text-base md:text-xl mt-5">{title}</h2>
        <p className="text-sm text-justify text-gray-300  mt-2 ">
          {description}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <p className="font-semibold">₹ {price}</p>
        <strike className="text-xs text-gray-400 ">₹ {comPrice}</strike>
        <p className="font-semibold text-red-600 text-xl italic  ">
          {" "}
          %{(100 - (price / comPrice) * 100).toFixed(1)} off
        </p>
      </div>
      <div className="flex mt-5">
        <button
          onClick={() => {
            router.push(
              "/Products/Product/" +
                title.replaceAll(" ", "_") +
                "?product=" +
                id
            );
          }}
          className="font-semibold bg-primaryColor border-gray-800 w-full rounded-sm shadow-md p-2"
        >
          View Detail
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
