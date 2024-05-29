"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { LeagalNav, MainNav } from "@/SampleData/Nav";
import { usePathname, useRouter } from "next/navigation";
import { Divider } from "@mui/joy";
import Image from "next/image";

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

      <div className="grid place-items-center p-5" >
        <Image src="/logo.jpg"  className="rounded-full " width={50} height={50}  />
      </div>
      <div className="p-5 flex flex-col text-white bg-ground gap-2">
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
<Divider/>
        {LeagalNav?.map((text, index) => (
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
