import { useRouter } from "next/navigation";
import React from "react";

const AllProductList = ({ title, description, ID, price }) => {
  const router = useRouter();
  return (
    <div className=" border flex-col md:flex-row  p-5 flex  gap-5  w-full border-gray-700 bg-ground ">
      <img
        src="https://utfs.io/f/03e62125-8919-4c96-a50d-c0f3a10305e3-yc8hal.svg"
        className=" w-full md:w-40"
      />
      <div className="flex gap-2 flex-col">
        <h2 className="font-semibold text-base md:text-xl">{title}</h2>
        <p className="text-gray-400 text-justify">{description}</p>
        <h3 className="font-semibold text-2xl italic ">₹{price}</h3>
      </div>
      <div className=" flex  gap-5">
        <button
          onClick={() => {
            router.push("/Dashboard/Products/EditProducts/" + ID);
          }}
          className="uil  bg-secondary h-10 w-10 p-2  rounded-sm md:rounded-md uil-pen"
        />
        <button className="uil  bg-secondary h-10 w-10 p-2  rounded-sm md:rounded-md uil-eye" />
        <button className="uil  bg-secondary h-10 w-10 p-2  rounded-sm md:rounded-md uil-trash" />
      </div>
    </div>
  );
};

export default AllProductList;
