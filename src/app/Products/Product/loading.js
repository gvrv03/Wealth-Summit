"use client";
import Spinner from "@/Components/Home/Utility/Spinner";
import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="grid place-items-center bg-ground h-screen fixed top-16 w-full left-0">
      <Spinner/>
    </div>
  );
};

export default Loading;
