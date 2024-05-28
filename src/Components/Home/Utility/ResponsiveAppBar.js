"use client";
import { useUserAuth } from "@/Context/UserAuthContext";
import { useAppStore } from "@/Context/UseStoreContext";
import { MainNav } from "@/Sample Data/Nav";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
const ResponsiveAppBar = ({ shadow, position, handleDrawerToggle }) => {
  const { userDetails, setsignOutIsOpen } = useAppStore();
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
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
        }     z-50  top-0 w-full  ${shadow} transition-all backdrop-blur-sm   delay-100 ease-linear left-0    md:px-0 px-5  border-gray-200`}
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
                MUI
              </Link>
            </div>
            <List className="gap-5 hidden md:flex">
              {MainNav.map((item, index) => (
                <button
                  key={index}
                  className="flex gap-2 items-center text-gray-500 hover:text-black hover:font-semibold  "
                >
                  <i className={item?.icon} />
                  <span>{item?.name}</span>
                </button>
              ))}
            </List>
            {userDetails?.isLogin ? (
              <AccountMenu />
            ) : (
              <button
                onClick={() => {
                  router.push("/Auth/Login");
                }}
                className="bg-primaryColor text-white font-semibold px-10"
              >
                SignIn
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(ResponsiveAppBar);
