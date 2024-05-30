"use client";
import AllProductSkeleton, {
  ProductSkeleton,
} from "@/Components/Skeleton/AllProductSkeleton";
import { ProductsURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ProductCard from "./ProductCard";

const AllProductComC = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const getData = async () => {
    try {
      setloading(true);

      const res = await axios.get(ProductsURL, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const Data = await res?.data;
      setproducts(Data?.products);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (products === undefined) {
    return (
      <div className="h-screen w-full grid place-items-center   bg-gray-950  ">
        Error occuured
      </div>
    );
  }
  return (
    <div>
      {loading && <AllProductSkeleton />}
      {!loading && products?.length === 0 && (
        <div className="w-full text-center font-semibold ">
          No Products Found
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4 ">
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
