import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classes from "./NavigationItems.module.css";

function NavigationItems(props) {
  return (
    <div>
      <Button className={classes.NavigationItem} component={Link} to={"/"}>
        Home
      </Button>
      {props.isAuthenticated ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={"/orders"}
        >
          Orders
        </Button>
      ) : null}
      {!props.isAuthenticated ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={"/login"}
        >
          Login
        </Button>
      ) : (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={"/logout"}
        >
          Logout
        </Button>
      )}
    </div>
  );
}

export default NavigationItems;
