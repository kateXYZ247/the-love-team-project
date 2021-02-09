import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classes from "./NavigationItems.module.css";
import { AUTH_ROLE } from "../../../constant/auth";
import {
  PATH_APPOINTMENTS,
  PATH_HISTORY,
  PATH_LOGIN,
  PATH_ORDER,
  PATH_PROVIDER_HISTORY,
  PATH_PROVIDER_LIST_SERVICES,
  PATH_PROVIDER_PROFILE,
  PATH_PROVIDER_UPCOMING_SERVICES,
} from "../../../constant/path";

function NavigationItems(props) {
  const { role, isAuthenticated, onLogout } = props;
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
      {isAuthenticated && role === AUTH_ROLE.user ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_HISTORY}
        >
          Orders
        </Button>
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.user ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_APPOINTMENTS}
        >
          Appointments
        </Button>
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_LIST_SERVICES}
        >
          Requests
        </Button>
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_UPCOMING_SERVICES}
        >
          Services
        </Button>
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_HISTORY}
        >
          Histories
        </Button>
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_PROVIDER_PROFILE}
        >
          Profile
        </Button>
      ) : null}
      {!isAuthenticated ? (
        <Button
          className={classes.NavigationItem}
          component={Link}
          to={PATH_LOGIN}
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
