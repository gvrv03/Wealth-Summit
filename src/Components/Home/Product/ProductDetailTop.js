import Image from "next/image";
import React from "react";
import CountdownTimer from "../Utility/CountDownTimer";
import ProductSlideShow from "./ProductSlideShow";

const ProductDetailTop = ({ product }) => {
  return (
    <div className=" rounded-sm md:rounded-md">
      {/* <ProductSlideShow images={product?.images} /> */}
      <Image  width={100} height={100} className="md:w-full w-full  "  src={product?.images}   / >
      <div className="  flex-col flex  gap-5 items-center justify-center"></div>{" "}
      <h1 className=" mt-5 text-2xl md:text-4xl font-bold ">{product?.title}</h1>{" "}
      <p className=" text-base md:text-xl  mt-2 text-gray-400 ">
        {product?.description}
      </p>{" "}
      <div className="items-center border-gray-700 bg-ground border p-5  flex gap-5  rounded-sm   mt-5 md:rounded-md">
        <h4 className=" text-3xl md:text-5xl italic text-yellow-300 font-bold">
          ₹ {product?.pricing?.price}
        </h4>
        <strike className="text-xs">₹ {product?.pricing?.comAtPrice}</strike>
        <p className="font-semibold text-red-600  italic text-xl   ">
          {" "}
          %
          {(
            100 -
            (product?.pricing?.price / product?.pricing?.comAtPrice) * 100
          ).toFixed(1)}{" "}
          off
        </p>
      </div>
      <CountdownTimer />
    </div>
  );
};

export default ProductDetailTop;
