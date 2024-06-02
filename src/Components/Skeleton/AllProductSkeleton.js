"use client";
import { Skeleton } from "@mui/joy";
import React from "react";

const AllProductSkeleton = () => {
  return (
    <>
      <section className=" grid  grid-cols-1">
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
    <div className=" bg-ground "/>
  );
}
