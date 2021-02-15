import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import {
  NAV_BAR_ADMIN_PATH_ITEMS,
  NAV_BAR_DEFAULT_PATH_ITEMS,
  NAV_BAR_PROVIDER_PATH_ITEMS,
  NAV_BAR_USER_PATH_ITEMS,
} from "../../../constant/path";
import { AUTH_ROLE } from "../../../constant/auth";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

function SideDrawer(props) {
  const classes = useStyles();

  const { open, onClose, isAuthenticated, role, currentPath } = props;

  return (
    <Drawer open={open} onClose={onClose}>
      <div className={classes.list} onClick={onClose}>
        <List>
          {!isAuthenticated
            ? NAV_BAR_DEFAULT_PATH_ITEMS.map((item) => (
                <MenuItem
                  button
                  component={Link}
                  to={item.path}
                  key={item.label}
                  selected={currentPath === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))
            : null}
          {isAuthenticated && role === AUTH_ROLE.user
            ? NAV_BAR_USER_PATH_ITEMS.map((item) => (
                <MenuItem
                  button
                  component={Link}
                  to={item.path}
                  key={item.label}
                  selected={currentPath === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))
            : null}
          {isAuthenticated && role === AUTH_ROLE.provider
            ? NAV_BAR_PROVIDER_PATH_ITEMS.map((item) => (
                <MenuItem
                  button
                  component={Link}
                  to={item.path}
                  key={item.label}
                  selected={currentPath === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))
            : null}
          {isAuthenticated && role === AUTH_ROLE.admin
            ? NAV_BAR_ADMIN_PATH_ITEMS.map((item) => (
                <MenuItem
                  button
                  component={Link}
                  to={item.path}
                  key={item.label}
                  selected={currentPath === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))
            : null}
        </List>
      </div>
    </Drawer>
  );
}

export default SideDrawer;
