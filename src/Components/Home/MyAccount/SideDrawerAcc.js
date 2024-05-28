import { useAppStore } from "@/Context/UseStoreContext";
import { DashNav } from "@/Sample Data/Nav";
import { Toolbar } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SideDrawerAcc = () => {
  const { userDetails } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <Toolbar sx={{ display: { xs: "none", sm: "block" } }} />
      <div className="gap-2  text-gray-600   md:gap-5 p-0 md:p-5  flex flex-col ">
        <div className="   grid grid-cols-2 gap-5   ">
          <button
            onClick={() => {
              router.push("/MyAccount/Orders");
            }}
            className="w-full  p-1 px-2 rounded-sm font-medium   bg-grayLight text-sm text-left "
          >
            <i className="uil uil-shopping-cart  text-lg mr-2" />{" "}
            <span>Orders</span>
          </button>
          <button className="w-full  p-1 px-2 rounded-sm font-medium   bg-grayLight text-sm text-left ">
            {" "}
            <i className="uil uil-heart  text-lg mr-2" />{" "}
            <span>Wishlist</span>
          </button>
          <button className="w-full  p-1 px-2 rounded-sm font-medium   bg-grayLight text-sm text-left ">
            {" "}
            <i className="uil uil-gift  text-lg mr-2" />{" "}
            <span>Coupans</span>
          </button>
          <button className="w-full  p-1 px-2 rounded-sm font-medium   bg-grayLight text-sm text-left ">
            {" "}
            <i className="uil uil-headphones  text-lg mr-2" />{" "}
            <span>Need Help</span>
          </button>
        </div>

        <div className="    w-full flex flex-col gap-2 md:gap-3   ">
          <AccountCardHeader
            styleCus="font-semibold text-base"
            name="Account Setting"
          />
          <div className="flex-col   flex gap-2">
            <button
              onClick={() => {
                router.push("/MyAccount/EditProfile");
              }}
              className="flex  justify-between  items-center w-full"
            >
              <span className="flex gap-5 items-center ">
                <i className="uil uil-user text-lg  " />
                <span className="font-normal  text-sm" >
                  Edit Profile
                </span>
              </span>
              <i className="uil uil-angle-right-b text-lg  " />
            </button>
            <button className="flex  justify-between  items-center w-full">
              <span className="flex gap-5 items-center ">
                <i className="uil uil-map-marker text-lg  " />
                <span className="font-normal  text-sm" >
                  Saved Addresses
                </span>
              </span>
              <i className="uil uil-angle-right-b text-lg  " />
            </button>
            <button className="flex  justify-between  items-center w-full">
              <span className="flex gap-5 items-center ">
                <i className="uil uil-bell text-lg  " />
                <span className="font-normal  text-sm" >
                  Notification Setting
                </span>
              </span>
              <i className="uil uil-angle-right-b text-lg  " />
            </button>
          </div>
        </div>

        <div className="    w-full flex flex-col gap-2 md:gap-3   ">
          <AccountCardHeader
            styleCus="font-semibold text-base"
            name="My Activity"
          />
          <div className="flex-col flex gap-2">
            <button className="flex  justify-between  items-center w-full">
              <span className="flex gap-5 items-center ">
                <i className="uil uil-edit-alt text-lg  " />
                <span className="font-normal  text-sm" >
                  Reviews
                </span>
              </span>
              <i className="uil uil-angle-right-b text-lg  " />
            </button>
            <button className="flex  justify-between  items-center w-full">
              <span className="flex gap-5 items-center ">
                <i className="uil uil-question text-lg  " />
                <span className="font-normal  text-sm" >
                  Questions & Answers
                </span>
              </span>
              <i className="uil uil-angle-right-b text-lg  " />
            </button>
          </div>
        </div>

        <div className="    w-full flex flex-col gap-2 md:gap-3   ">
          <AccountCardHeader
            styleCus="font-semibold text-base"
            name="Feedbacks & Information"
          />
          <div className="flex-col flex gap-2">
            <button className="flex  justify-between  items-center w-full">
              <span className="flex gap-5  items-center ">
                <i className="uil uil-file-copy-alt text-lg  " />
                <span className="font-normal  text-sm" >
                  Terms, Policies & Licenses
                </span>
              </span>
              <i className="uil uil-angle-right-b text-lg  " />
            </button>
            <button className="flex  justify-between  items-center w-full">
              <span className="flex gap-5 items-center ">
                <i className="uil uil-question-circle text-lg  " />
                <span className="font-normal  text-sm" >
                  Browse FAQs
                </span>
              </span>
              <i className="uil uil-angle-right-b text-lg  " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export const AccountCardHeader = ({ name,styleCus }) => {
  return (
    <div className="flex justify-between mt-5 md:mt-0  text-gray-700" >
      <h2 className={`${styleCus}`}  >{name}</h2>
    </div>
  );
};


export default SideDrawerAcc;
