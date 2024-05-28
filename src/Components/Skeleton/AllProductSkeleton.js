"use client";
import { Skeleton } from "@mui/material";
import React from "react";

const AllProductSkeleton = () => {
  return (
    <>
      <section className=" md:mt-0 mt-10 grid grid-cols-2  md:grid-cols-5 gap-5 justify-between  flex-wrap ">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </section>
      <div className="w-full mt-5 flex justify-between">
        <Skeleton variant="rectangular"  className="bg-gray-900" width="80px" height={30} />
        <Skeleton variant="rectangular"  className="bg-gray-900" width="80px" height={30} />
      </div>
    </>
  );
};

export default AllProductSkeleton;

export function ProductSkeleton() {
  return (
    <div className="w-full md:w-auto   bg-gray-900    ">
      <div className=" rounded-sm">
        <div className="md:block hidden">
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>
        <div className="block md:hidden">
          <Skeleton variant="rectangular" width="100%" height={160} />
        </div>
        <div className="flex gap-2 items-center justify-between p-2 flex-wrap mt-2 ">
          <Skeleton variant="rectangular" width="100%" height={50} />
          <Skeleton variant="rectangular" width="100%" height={20} />
        </div>
      </div>
    </div>
  );
}
