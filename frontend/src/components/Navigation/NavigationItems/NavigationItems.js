import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classes from "./NavigationItems.module.css";

function NavigationItems(props) {
  const { isAuthenticated, onLogout } = props;
  return (
    <div>
      <Button className={classes.NavigationItem} component={Link} to={"/"}>
        Home
      </Button>
      {isAuthenticated ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={"/history"}
        >
          Orders
        </Button>
      ) : null}
      {!isAuthenticated ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={"/login"}
        >
          Login
        </Button>
      ) : (
        <Button className={classes.NavigationItem} onClick={onLogout}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default NavigationItems;
