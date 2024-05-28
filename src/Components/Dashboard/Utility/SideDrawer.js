import { useAppStore } from "@/Context/UseStoreContext";
import { DashNav } from "@/Sample Data/Nav";
import { Toolbar } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SideDrawer = () => {
  const { userDetails } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      {/* <Toolbar sx={{ display: { xs: "none", sm: "block" } }} /> */}
      <div className="px-3 flex flex-col justify-between  py-2 relative h-full bg-secondary md:-mt-1">
        <div className="justify-between flex-col flex gap-2   mt-2">
          
          {DashNav.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  router.push(item?.location);
                }}
                className={` ${
                  pathname === item.location
                    ? "text-white rounded-md bg-secondarylight "
                    : "text-gray-400"
                }  text-left   p-2  items-center flex gap-2 hover:rounded-md hover:bg-secondarylight  hover:text-white text-sm`}
              >
                <span
                  className={`${item.icon} text-white text-base font-bold `}
                />
                <span className="font-semibold   ">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="text-white items-center gap-2  justify-between only: bg-secondarylight p-2 rounded-md  flex ">
          <div className=" border-l-2 pl-2 flex-col flex items-center  ">
            <p className="text-white font-semibold text-sm  uppercase">
              {" "}
              {userDetails?.User?.name}
            </p>
            <button className="text-xs text-gray-200 w-full text-left ">
              My Account
            </button>
          </div>
          <div className="border p-2 w-10 h-10  rounded-md border-blue-900 grid place-items-center">
            M
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
