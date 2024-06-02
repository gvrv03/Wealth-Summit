import { getSingleProductURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import ProductDetailTop from "@/Components/Home/Product/ProductDetailTop";
import BuyBtn from "@/Components/Home/Product/BuyBtn";
import { CardStack } from "@/Components/Home/Utility/CardStack";
import NotFoundProduct from "@/app/Products/Product/not-found";
import EditProductsComp from "@/Components/Dashboard/Product/EditProductsComp";

const ProductDetal = async ({ params }) => {
  const res = await axios.get(getSingleProductURL + params.PID, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const product = await res?.data;
  const { artical } = product ? product : {};
  if (artical === undefined) {
    return (
      <div className=" bg-gray-950  h-full ">
        {params.PID}
        <NotFoundProduct />
      </div>
    );
  }
  return (
    <>
      <EditProductsComp product={product} />
    </>
  );
};

export default ProductDetal;
