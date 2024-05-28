import { Skeleton } from "@mui/material";
import React from "react";

const TutDescSkeleton = () => {
  return (
    <div className="flex flex-col md:w-[70%]  bg-gray-950  gap-2 ">
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={90} />
      <Skeleton variant="rectangular" width="100%" height={30} />
      <Skeleton variant="rectangular" width="100%" height={10} />
      <Skeleton variant="rectangular" width="100%" height={30} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={500} />
    </div>
  );
};

export default TutDescSkeleton;
