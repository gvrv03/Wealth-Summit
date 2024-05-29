"use client";
import { Skeleton } from "@mui/joy";
import React from "react";

const AllProductSkeleton = () => {
  return (
    <>
      <section className=" grid  grid-cols-2  md:grid-cols-5 gap-5 justify-between  flex-wrap ">
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
     
    </>
  );
};

export default AllProductSkeleton;

export function ProductSkeleton() {
  return (
    <div className="w-full md:w-auto   bg-gray-900    ">
      <div className=" rounded-sm">
        <div className="md:block hidden">
          <div   className=" animate-pulse w-full h-[200px]   bg-secondary  "  width="100%" height={200} />
        </div>
        <div className="block md:hidden">
          <div   className=" animate-pulse w-full h-32   bg-secondary"  width="100%" />
        </div>
        <div className="flex gap-2 items-center justify-between  flex-wrap mt-2 ">
          <div   className=" animate-pulse w-full h-[50px]   bg-secondary"  width="100%" />
        </div>
      </div>
    </div>
  );
}
