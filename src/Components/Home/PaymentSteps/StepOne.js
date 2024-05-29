"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";
import { useState } from "react";

const StepOne = () => {
  const { setcurPayUser ,curPayUser} = useAppStore();
console.log(curPayUser);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcurPayUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <form className=" md:flex-row items-center flex-col flex gap-5">
      <input
        type="text"
        name="name"
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-700 outline-none bg-ground rounded-sm md:rounded-md"
        placeholder="Ex. Joe jordan"
      />
      <input
        name="email"
        onChange={handleInputChange}
        type="email"
        className="w-full p-2 border border-gray-700 outline-none bg-ground rounded-sm md:rounded-md"
        placeholder="Ex. joejordan@gmail.com"
      />
    </form>
  );
};

export default StepOne;
