"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import { MainNav } from "@/SampleData/Nav";
import { List } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import SideDrawerHome from "./SideDrawerHome";
const ResponsiveAppBar = ({ shadow, position, handleDrawerToggle }) => {
  const { userDetails, setsignOutIsOpen } = useAppStore();
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const componentPosition = 200;
      const threshold = 100; // Adjust this threshold as needed

      if (scrollPosition > componentPosition - threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={` ${
          isSticky ? position + " top-0 " : ""
        }     z-[9999]  top-0 w-full  ${shadow} transition-all backdrop-blur-sm  bgNav   delay-100 ease-linear left-0    md:px-0 px-5  border-gray-200`}
      >
        <div className="flex flex-wrap justify-between   gap-5 items-center  m-auto  md:px-5 py-3">
          <div className="  flex justify-between   w-full  gap-5">
            <div className="flex  items-center md:w-full  gap-5">
              <Image
                src="/logo.jpg"
                width={30}
                className="rounded-full"
                height={30}
              />
              <Link href="/" className=" font-semibold flex items-center">
                Wealth Summit
              </Link>
            </div>
            <List className="gap-5 hidden md:flex">
              {MainNav.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    router.push(item?.location);
                  }}
                  className={` ${
                    pathname === item?.location && "text-blue-500 font-semibold"
                  } flex gap-2 items-center text-white hover:text-blue-500 hover:font-semibold `}
                >
                  <i className={item?.icon} />
                  <span>{item?.name}</span>
                </button>
              ))}
            </List>
            <div className="flex gap-5 items-center">
              {userDetails?.isLogin && <AccountMenu />}
              <SideDrawerHome />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(ResponsiveAppBar);
