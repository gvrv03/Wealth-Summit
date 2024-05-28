import Image from "next/image";
import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";

const AccessDenied = () => {
  return (
    <>
      <ResponsiveAppBar shadow="shadow-md " position="fixed" />
      <div className="flex flex-col h-[80vh] items-center justify-center">
        <Image src="/accessDenied.jpg" height={250} width={300} />
        <h2 className="text-gray-400 py-2 font-semibold">
          You do not have permission to access this page.
        </h2>
      </div>
    </>
  );
};

export default AccessDenied;
