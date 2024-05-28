"use client";
import AccountMenu from "@/Components/Home/Utility/AccountMenu";
import { useAppStore } from "@/Context/UseStoreContext";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";

const AdminNavBar = ({ shadow, position, handleDrawerToggle }) => {
  const [isSticky, setIsSticky] = useState(false);
  const { setsignOutIsOpen } = useAppStore();
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
          isSticky ? position + " top-0" : ""
        }     z-50  top-0 w-full  ${shadow} transition-all delay-100 ease-linear left-0    md:px-0 px-5  `}
      >
        <div className="flex flex-wrap justify-between   gap-5 items-center  m-auto  md:px-5 py-3">
          <div className="  flex justify-between   w-full  gap-5">
            <div className="flex  items-center md:w-full  gap-5">
              <IconButton
                sx={{ display: { sm: "none" } }}
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Link href="/" className="flex items-center">
                <span className="self-center  text-base md:text-xl font-semibold whitespace-nowrap">
                  MUI
                  <span className="text-[7px] pColor">ADMIN</span>
                </span>
              </Link>
            </div>
            <div className="flex  justify-end w-full  gap-5">
              <div className="flex">
                <IconButton color="inherit">
                  <i className=" text-xl  w-5 grid place-items-center h-5 pColor uil uil-bell" />
                </IconButton>
               <AccountMenu/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(AdminNavBar);
