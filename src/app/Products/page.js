import AllProductComC from "@/Components/Home/Product/AllProductComC";
import AllProductSkeleton from "@/Components/Skeleton/AllProductSkeleton";
import { ProductsURL } from "@/helper/allLinks";
import axios from "axios";
import React from "react";
import { Suspense } from "react";

const page = async () => {
  const res = await axios.get(ProductsURL, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const Data = await res?.data;
  return (
    <Suspense fallback={<AllProductSkeleton />}>
      <AllProductComC products={Data?.products} />
    </Suspense>
  );
};

export default page;
