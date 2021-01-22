import React from "react";
import { AppBar } from "@material-ui/core";

import classes from "./NavBar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

function NavBar(props) {
  return (
    <AppBar>
      <div className={classes.Container}>
        <div className={classes.Logo}>Logo</div>
        <NavigationItems isAuthenticated={props.isAuth} />
      </div>
    </AppBar>
  );
}

export default NavBar;
