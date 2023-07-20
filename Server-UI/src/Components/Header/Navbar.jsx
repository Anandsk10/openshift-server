import React from "react";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Profile from "./Navtabs/profile";
import Notification from "./Navtabs/notification";
import { useStyles } from "./HeaderStyles";
import Messages from "./Navtabs/Messages";
import MenuIcon from "@material-ui/icons/Menu";
// import amd from "../../img/amd.png";
import amd from "../../img/amd1.png";

export default function Navbar({ handleDrawerOpen }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      {/* for mobile */}
      {/* <Hidden mdUp>
        <Toolbar className={classes.toolbarMobile}>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <img src={amd} alt="" className={classes.amd} srcset="" />
          </IconButton>
        </Toolbar>
      </Hidden> */}

      {/* for lap and tabs */}
      <Toolbar
        className={classes.toolbar}
        style={{ height: -2 }}
        variant="dense"
      >
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Hidden smDown>
          <IconButton color="inherit">
            <img src={amd} alt="" className={classes.amd} srcset="" />
          </IconButton>
        </Hidden>

        <Typography variant="h2" className={classes.logo}>
          Server Management
        </Typography>
        {/* <Hidden smDown> */}
        <Box style={{ display: "flex" }}>
          {/* <Notification /> */}
          {/* <Messages /> */}
          <Profile />
        </Box>
        {/* </Hidden> */}
      </Toolbar>
    </AppBar>
  );
}
