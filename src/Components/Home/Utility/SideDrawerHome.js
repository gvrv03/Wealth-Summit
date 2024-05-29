"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { MainNav } from "@/SampleData/Nav";
import { usePathname, useRouter } from "next/navigation";

export default function SideDrawerHome() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const router = useRouter();
  const pathname = usePathname();

  const DrawerList = (
    <Box
      className="bg-ground h-screen overflow-hidden "
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div className="p-5 flex flex-col text-white bg-ground gap-5">
        {MainNav?.map((text, index) => (
          <button
            onClick={() => {
              router.push(text.location);
            }}
            key={index}
            className={`  ${
              text?.icon
            } gap-2 flex items-center uil text-left  p-2   ${
              pathname === text?.location && "bg-secondary font-semibold"
            }  hover:bg-secondary hover:font-semibold `}
          >
            {text.name}
          </button>
        ))}
      </div>
    </Box>
  );

  return (
    <div>
      <button
        className="md:hidden inline  uil uil-align-right text-3xl "
        onClick={toggleDrawer(true)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
