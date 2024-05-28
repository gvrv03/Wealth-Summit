import React from "react";

const TableSkeleton = () => {
  return (
    <div className="animate-pulse flex-col flex gap-2 bg-transparent">
      <div className=" h-6 md:h-7 bg-grayLight mt-3  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
      <div className=" h-6 md:h-7 bg-grayLight  rounded"></div>
    </div>
  );
};

export default TableSkeleton;
