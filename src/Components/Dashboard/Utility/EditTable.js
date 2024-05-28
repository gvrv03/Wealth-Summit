"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useAppStore } from "@/Context/UseStoreContext";
import { useRouter } from "next/navigation";

export default function EditTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
            className="text-xl text-gray-400 "
            color="inherit"
          >
            <MoreVertIcon/>
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
        <div className=" flex flex-col  px-2 gap-1">
         <button className="text-[10px] w-full text-left uil flex gap-2 p-1 text-gray-500 hover:text-black hover:font-semibold uil-edit" >Update</button>
         <button className="text-[10px] w-full text-left uil flex gap-2 p-1 text-gray-500 hover:text-black hover:font-semibold uil-pen" >View</button>
         <button className="text-[10px] w-full text-left uil flex gap-2 p-1 hover:font-semibold uil-trash-alt bg-red text-white" >Delete</button>
        </div>
      </Menu>
    </React.Fragment>
  );
}
