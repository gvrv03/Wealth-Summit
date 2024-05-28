"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/Context/UseStoreContext";
import AccessDenied from "@/Components/Home/Utility/AccessDenied";
import SideDrawerAcc from "@/Components/Home/MyAccount/SideDrawerAcc";
import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
const drawerWidth = 300;

function ResponsiveDrawer({ window, children }) {
  const router = useRouter();
  const { userDetails } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (userDetails?.isLogin) {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="inherit"
          sx={{
            width: "100%",
            ml: { sm: `${drawerWidth}px` },
            boxShadow: "none",
          }}
          className="z-20  border-b"
        >
          <ResponsiveAppBar position="fixed"  />
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            background: "red",
          }}
          aria-label="mailbox folders"
          className="z-10"
        >
          
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <SideDrawerAcc />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            // background:"red",
            flexGrow: 1,
            width: "{ sm: `calc(100% - ${drawerWidth}px)` }",
          }}
          className="p-5"
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
  }
  return <AccessDenied />;
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
