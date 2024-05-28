"use client";
import { Skeleton } from "@mui/material";
import React from "react";

const AllBlogsSkeleton = () => {
  return (
    <>
      <section className=" md:mt-0 mt-10 grid grid-cols-2  md:grid-cols-5 gap-5 justify-between  flex-wrap ">
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
      </section>
      <div className="w-full mt-5 flex   justify-between">
        <Skeleton variant="rectangular"  className="bg-gray-900" width="80px" height={30} />
        <Skeleton variant="rectangular"  className="bg-gray-900" width="80px" height={30} />
      </div>
    </>
  );
};

export default AllBlogsSkeleton;

export function BlogsSkeleton() {
  return (
    <div className="w-full       md:w-auto bg-gray-900">
      <div className=" rounded-sm">
        <div className="md:block hidden">
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>
        <div className="block md:hidden">
          <Skeleton variant="rectangular" width="100%" height={160} />
        </div>

        <div className="p-2 ">
          <Skeleton variant="rectangular" width="100%" height={15} />
          <Skeleton variant="rectangular" width="100%" height={40} />

          <div className="flex gap-1 items-center justify-between flex-wrap mt-2 ">
            <Skeleton variant="rectangular" width={200} height={15} />
            <Skeleton variant="rectangular" width={100} height={15} />
          </div>
        </div>
      </div>
    </div>
  );
}
