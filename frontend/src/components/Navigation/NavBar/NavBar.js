import React from "react";
import { AppBar } from "@material-ui/core";

import classes from "./NavBar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

function NavBar(props) {
  const { isAuthenticated, onLogout } = props;
  return (
    <React.Fragment>
      <AppBar color="primary">
        <div className={classes.Container}>
          <div className={classes.Logo}>Logo</div>
          <NavigationItems
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
          />
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
