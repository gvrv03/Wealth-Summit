import React from "react";

const ProductNotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center  h-full py-10">
      <img
        src="https://www.blogger.com/img/pencilpotscissorsdesk.png"
        alt="Image not found"
        className="w-36"
      />
      <h3 className="md:text-base font-medium text-gray-600 text-sm">
        No Product
      </h3>
      <p className="text-sm font-light" >Prodct that you create will show up here</p>
    </div>
  );
};

export default ProductNotFound;
