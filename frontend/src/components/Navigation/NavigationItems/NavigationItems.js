import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classes from "./NavigationItems.module.css";
import { AUTH_ROLE } from "../../../constant/auth";
import {
  PATH_APPOINTMENTS,
  PATH_HISTORY,
  PATH_ORDER,
  PATH_PROVIDER_HISTORY,
  PATH_PROVIDER_LIST_SERVICES,
  PATH_PROVIDER_PROFILE,
  PATH_PROVIDER_UPCOMING_SERVICES,
} from "../../../constant/path";

function NavigationItems(props) {
  const { role, onLogout } = props;
  return (
    <div>
      {role !== AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_ORDER}
        >
          Book
        </Button>
      ) : null}
      {role === AUTH_ROLE.user ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_HISTORY}
        >
          Orders
        </Button>
      ) : null}
      {role === AUTH_ROLE.user ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_APPOINTMENTS}
        >
          Appointments
        </Button>
      ) : null}
      {role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_LIST_SERVICES}
        >
          Requests
        </Button>
      ) : null}
      {role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_UPCOMING_SERVICES}
        >
          Services
        </Button>
      ) : null}
      {role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_HISTORY}
        >
          Histories
        </Button>
      ) : null}
      {role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_PROFILE}
        >
          Profile
        </Button>
      ) : null}
      {role === null ? (
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
