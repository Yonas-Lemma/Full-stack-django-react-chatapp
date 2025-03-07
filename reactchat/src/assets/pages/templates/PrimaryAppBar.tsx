import React, { useState, useEffect } from "react";
import {
  AppBar,
  Link,
  Typography,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories";

const PrimaryAppBar = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen, sideMenu]);

  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event.type == "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setSideMenu(open);
    };

    const list = ()=>(
      <Box sx={{ paddingTop: `${theme.PrimaryAppBar.height}px`, minHeight:200}} 
      role="presentation" 
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      >
        <ExploreCategories/>
        
      </Box>
    );

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.PrimaryAppBar.height,
          minHeight: theme.PrimaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>

        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}
          >
            InfoChat
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default PrimaryAppBar;
