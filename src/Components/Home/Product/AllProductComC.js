import { ProductsURL } from "@/helper/allLinks";
import React from "react";
import ProductCard from "./ProductCard";

const AllProductComC = async () => {
  const res = await fetch(ProductsURL, { cache: "no-cache" });
  const Data = await res?.json();
  if (Data?.products === undefined) {
    return (
      <div className="h-screen w-full grid place-items-center   bg-gray-950  ">
        Error occuured
      </div>
    );
  }
  return (
    <div>
      {Data?.products?.length === 0 && <div className="w-full text-center font-semibold " >No Products Found</div>}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 ">
        {Data?.products?.map((item, index) => {
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
