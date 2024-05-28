"use client";
import { Skeleton } from "@mui/material";
import React from "react";

const TopProductSkeleton = () => {
  
  return (
    <>
      <section className="flex p-5 gap-5  bg-gray-950   w-full  no-scrollbar   overflow-x-scroll ">
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

export default TopProductSkeleton;

export function ProductSkeleton() {
    return (
      <div className=" md:w-auto        bg-gray-950  ">
        <div className=" rounded-sm">
          <div className="w-56 md:block  hidden">
            <Skeleton variant="rectangular" width="100%" height={200} />
          </div>
          <div className="block w-36  md:hidden">
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
  