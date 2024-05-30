import AllProductComC from "@/Components/Home/Product/AllProductComC";
import AllProductSkeleton from "@/Components/Skeleton/AllProductSkeleton";
import React from "react";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<AllProductSkeleton />}>
      <AllProductComC />
    </Suspense>
  );
};

export default page;
