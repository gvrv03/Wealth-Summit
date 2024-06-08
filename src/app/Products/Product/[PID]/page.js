import { getSingleProductURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";
import NotFoundProduct from "../not-found";
import "suneditor/dist/css/suneditor.min.css";
import ProductDetailTop from "@/Components/Home/Product/ProductDetailTop";
import BuyBtn from "@/Components/Home/Product/BuyBtn";
import StepOne from "@/Components/Home/PaymentSteps/StepOne";
import Link from "next/link";

const ProductDetal = async ({ params }) => {
  const res = await axios.get(getSingleProductURL + params?.PID, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const product = await res?.data;
  const { artical } = product ? product : {};
  if (artical === undefined) {
    return (
      <div className=" bg-gray-950  h-full ">
        <NotFoundProduct />
      </div>
    );
  }
  return (
    <div className=" md:m-2 flex-col  flex gap-5 m-0">
      <div className="flex gap-5 md:flex-row flex-col-reverse">
        <div className="w-full bg-ground  rounded-sm md:rounded-md  text-justify ">
          <ProductDetailTop product={product} />
          <p className="text-xl font-semibold py-2">Description</p>

          <article
            className=" text-sm se-wrapper-inner text-justify  "
            dangerouslySetInnerHTML={{ __html: product?.artical }}
          />
<div className="bg-secondarylight  w-full p-[0.5px] mt-5" />
          <div className="mt-5">
            <p className="text-xl font-semibold">Contact WealthXSubmit</p>
            <div className="mt-2">
              <p className="uil  text-sm flex gap-2 items-center  uil-envelope" >wealthsummit@wealthsummit.shop</p>
              <p className="uil  text-sm flex gap-2 items-center  uil-phone" >+91 7796305802</p>
            </div>
          </div>
        </div>
        <div className="   hidden md:relative md:z-0 z-10  p-5 bottom-0 left-0 md:flex bg-ground   w-full md:w-[40%]     gap-2 flex-col   text-justify ">
          <StepOne pID={product?._id} pPrice={product?.pricing?.price} />
        </div>
        <div className=" md:hidden fixed md:relative md:z-0 z-10  p-5 bottom-0 left-0 flex bg-ground   w-full md:w-[30%]     gap-2 flex-col   text-justify ">
          <BuyBtn
            product={{
              productID: product?.productID,
              id: product?._id,
              name: product?.title,
              price: product?.pricing?.price,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetal;
