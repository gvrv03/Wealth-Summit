import Image from "next/image";
import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";

const NotFoundCom = () => {
  return (
    <>
      <ResponsiveAppBar shadow="shadow-md " position="fixed" />
      <div className="flex flex-col h-[80vh] items-center justify-center">
        <Image src="/notFound.avif" height={250} width={300} />
        <h2 className="text-gray-400 py-2 font-semibold">
          The page you are looking for could not be found.
        </h2>
      </div>
    </>
  );
};

export default NotFoundCom;
