import { ProductsURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";
import ProductCard from "./ProductCard";

const AllProductComC = ({ products }) => {
  if (products === undefined) {
    return (
      <div className="h-screen w-full grid place-items-center   bg-gray-950  ">
        Error occuured
      </div>
    );
  }
  return (
    <div>
      {products?.length === 0 && (
        <div className="w-full text-center font-semibold ">
          No Products Found
        </div>
      )}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 ">
        {products?.map((item, index) => {
          return (
            <ProductCard
              key={index}
              description={item?.description}
              thumbnail={item?.thumbnail}
              title={item?.title}
              price={item?.pricing?.price}
              comPrice={item?.pricing?.comAtPrice}
              views={item?.views}
              id={item?._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProductComC;
