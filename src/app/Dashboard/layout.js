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
import AdminNavBar from "@/Components/Dashboard/Utility/AdminNavBar";
import { DashNav } from "@/Sample Data/Nav";
import SideDrawer from "@/Components/Dashboard/Utility/SideDrawer";
import { useAppStore } from "@/Context/UseStoreContext";
import AccessDenied from "@/Components/Home/Utility/AccessDenied";
import { UseDashboardContextProvider } from "@/Context/UseDashboardContext";
import { UseProductContexProvider } from "@/Context/UseProductContext";
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

  if (userDetails?.isAdmin || userDetails?.isRoot) {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="inherit"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            boxShadow: "none ",
          }}
          className="z-20  bg-ground "
        >
          <AdminNavBar handleDrawerToggle={handleDrawerToggle} />
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
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <SideDrawer />
          </Drawer>
          <Drawer
            classes={{ paper: "bgGround" }}
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
            <SideDrawer />
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

          <UseDashboardContextProvider>
            <UseProductContexProvider>{children}</UseProductContexProvider>
          </UseDashboardContextProvider>
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
