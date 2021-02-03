import React from "react";
import { AppBar } from "@material-ui/core";

import classes from "./NavBar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

function NavBar(props) {
  const { onLogout, role, isAuthenticated } = props;
  return (
    <React.Fragment>
      <AppBar color="primary">
        <div className={classes.Container}>
          <div className={classes.Logo}>Logo</div>
          <NavigationItems
            role={role}
            onLogout={onLogout}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
