"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import { useRouter } from "next/navigation";
import React from "react";

import { toast } from "react-hot-toast";
import { IconButton } from "@mui/material";
const HeaderStatBar = ({ setLimit, limit, location }) => {
  const router = useRouter();
  const { handleGenerateRandomString } = useAppStore();
  return (
    <div className="flex-col  pb-5 flex gap-5">
      <div className="flex gap-2">
        <input
          placeholder="Search"
          type="text"
          className=" w-full bg-secondary outline-none p-2"
        />
        <div className="gap-2  flex">
          <button
            onClick={handleGenerateRandomString}
            className="uil uil-sync bg-secondary h-full px-3"
          />
          <button className="uil uil-search bg-secondary h-full px-3" />
          <button
            onClick={() => {
              router.push(location);
            }}
            className="bg-secondary h-full px-3 flex gap-2 items-center font-medium "
          >
            <span className="uil uil-plus" />
            <span>Create</span>{" "}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="  text-sm    px-3  bg-secondary h-full py-1  flex gap-2 items-center">
            {" "}
            <span className="uil uil-import" />
            <span>Import</span>{" "}
          </button>
          <button className="  text-sm    px-3  bg-secondary h-full py-1  flex gap-2 items-center">
            {" "}
            <span className="uil uil-export" />
            <span>Export</span>{" "}
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500 ">Row per Page</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
            className="outline-none bg-secondary px-3 py-1"
          >
            <option value="">All</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeaderStatBar;
