import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function NavigationItems(props) {
  return (
    <div>
      <Button component={Link} to={"/"}>
        Home
      </Button>
      {props.isAuthenticated ? (
        <Button component={Link} to={"/orders"}>
          Orders
        </Button>
      ) : null}
      {!props.isAuthenticated ? (
        <Button component={Link} to={"/login"}>
          Login
        </Button>
      ) : (
        <Button component={Link} to={"/logout"}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default NavigationItems;
