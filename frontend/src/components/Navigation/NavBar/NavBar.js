import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import classes from "./NavBar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

function NavBar(props) {
  return (
    <React.Fragment>
      <AppBar color="primary">
        <div className={classes.Container}>
          <div className={classes.Logo}>Logo</div>
          <NavigationItems isAuthenticated={props.isAuth} />
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
