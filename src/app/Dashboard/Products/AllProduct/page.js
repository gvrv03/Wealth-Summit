"use client";
import { useProduct } from "@/Context/UseProductContext";
import React, { useState } from "react";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import { useAppStore } from "@/Context/UseStoreContext";
import MaintableCom from "@/Components/Dashboard/Utility/MainTableCom";
import HeaderStatBar from "@/Components/Dashboard/Utility/HeaderStatBar";
import AllProductList from "@/Components/Dashboard/Product/AllProductList";
import { Suspense } from "react";
import AllProductSkeleton from "@/Components/Skeleton/AllProductSkeleton";
import ALLPLoad from "../../loading";

const Page = () => {
  const { AllProducts, refresh } = useAppStore();
  const { fetchProducts } = useProduct();
  const [colData, setcolData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    fetchProducts({
      page: page,
      limit: limit,
    });
  }, [page, limit, refresh]);
  const [productID, setProductID] = useState("");
  const { data, isLoading, totalPages, count } = AllProducts ? AllProducts : {};
  if (data?.length > 0) {
    if (colData.length === 0) {
      setcolData(Object.keys(data[0]));
    }
  }
  return (
    // <div className="  bg-gray-950  p-5 -mx-2 md:-mt-2 flex-col flex gap-5  ">
    <div className="      flex-col flex gap-5  ">
      <HeaderStatBar
        // limit={limit}
        // page={page}
        // setLimit={setLimit}
        // noOfData={data?.length}
        // setPage={setPage}
        // totalPages={totalPages}
        location="/Dashboard/Products/CreateProduct"
      />

      <div className="flex-col flex gap-5">
        {data?.map((item, index) => {
          return (
            <AllProductList
              title={item?.title}
              description={item?.description}
              price={item?.pricing?.price}
              ID={item?._id}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
