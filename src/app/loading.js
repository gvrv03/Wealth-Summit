"use client";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import Spinner from "@/Components/Home/Utility/Spinner";
import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div>
      <ResponsiveAppBar shadow=" " position="fixed" />
      <div className="grid place-items-center bg-ground h-screen fixed  top-0 w-full left-0">
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;
