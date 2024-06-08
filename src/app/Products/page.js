import ProductCard from "@/Components/Home/Product/ProductCard";
import AllProductSkeleton from "@/Components/Skeleton/AllProductSkeleton";
import { ProductsURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";
import { Suspense } from "react";

const AllProductComC = async () => {
  const res = await axios.get(ProductsURL, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const Data = await res?.data;
  if (!Data?.products) {
    return (
      <div className="h-screen w-full grid place-items-center   bg-gray-950  ">
        Error occuured
      </div>
    );
  }
  return (
    <div>
      {Data?.products?.length === 0 && (
        <div className="w-full text-center font-semibold ">
          No Products Found
        </div>
      )}
      <Suspense fallback={<AllProductSkeleton />}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 ">
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
      </Suspense>
    </div>
  );
};

export default AllProductComC;
