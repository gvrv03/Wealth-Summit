"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAppStore } from "@/Context/UseStoreContext";
import { useRouter } from "next/navigation";
import Script from "next/script";
import RazorpayBTN from "./RazorpayBTN";
import { Suspense } from "react";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setsignOutIsOpen, userDetails } = useAppStore();
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0.5px 1px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className=" flex flex-col gap-3 px-5 p-2">
          <label className="border-b-2 flex gap-2 items-center justify-center pb-2 border-blue-950">
            <i className="uil uil-user" />
            {userDetails?.User?.name}
          </label>
          <div className="flex-col flex gap-2">
            <button
              onClick={() => {
                router.push("/MyAccount");
              }}
              className="text-left    text-gray-500 hover:font-semibold hover:text-black text-sm"
            >
              My Account
            </button>
            <button className="text-left  text-gray-500 hover:font-semibold hover:text-black text-sm">
              Wishlist
            </button>

            {(userDetails?.isAdmin || userDetails?.isRoot) && (
              <button
                onClick={() => {
                  router.push("/Dashboard");
                }}
                className="text-left  text-gray-500 hover:font-semibold hover:text-black text-sm"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => {
                setsignOutIsOpen(true);
              }}
              className=" text-left  flex uppercase border p-2 items-center justify-center rounded-md gap-2 text-gray-500 hover:font-semibold hover:text-black text-sm"
            >
              <i className="uil text-gray-900 uil-signout" />
              <span>Signout</span>
            </button>
          </div>
        </div>
      </Menu>
    </React.Fragment>
  );
}
