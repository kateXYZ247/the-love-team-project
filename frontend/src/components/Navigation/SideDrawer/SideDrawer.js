import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  NAV_BAR_DEFAULT_PATH_ITEMS,
  NAV_BAR_PROVIDER_PATH_ITEMS,
  NAV_BAR_USER_PATH_ITEMS,
} from "../../../constant/path";
import { AUTH_ROLE } from "../../../constant/auth";

function SideDrawer(props) {
  const { open, onClose, isAuthenticated, role } = props;

  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        {!isAuthenticated
          ? NAV_BAR_DEFAULT_PATH_ITEMS.map((item) => (
              <ListItem button key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))
          : null}
        {isAuthenticated && role === AUTH_ROLE.user
          ? NAV_BAR_USER_PATH_ITEMS.map((item) => (
              <ListItem button key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))
          : null}
        {isAuthenticated && role === AUTH_ROLE.provider
          ? NAV_BAR_PROVIDER_PATH_ITEMS.map((item) => (
              <ListItem button key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))
          : null}
      </List>
    </Drawer>
  );
}

export default SideDrawer;
