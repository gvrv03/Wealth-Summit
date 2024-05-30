import { getSingleProductURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";
import NotFoundProduct from "../not-found";
import "suneditor/dist/css/suneditor.min.css";
import ProductDetailTop from "@/Components/Home/Product/ProductDetailTop";
import BuyBtn from "@/Components/Home/Product/BuyBtn";

const ProductDetal = async ({ searchParams }) => {
  const res = await axios.get(getSingleProductURL + searchParams.product, {
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
    <div className=" md:m-2 flex-col flex gap-5 m-0">
      <ProductDetailTop product={product} />
      <div className="flex gap-5 md:flex-row flex-col-reverse">
        <div className="w-full bg-ground border border-gray-700  rounded-sm md:rounded-md    p-5 text-justify ">
          <article
            className=" se-wrapper-inner text-justify  "
            dangerouslySetInnerHTML={{ __html: product?.artical }}
          />
        </div>
        <div className="  fixed md:relative bottom-0 left-0 md:flex bg-ground md:border  w-full md:w-[25%]  border-gray-700  rounded-sm md:rounded-md   gap-2 flex-col  p-5 text-justify ">
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
