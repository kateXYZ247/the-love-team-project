import React from "react";
import { Tabs } from "@material-ui/core";
import { AUTH_ROLE } from "../../../constant/auth";
import {
  NAV_BAR_DEFAULT_PATH_ITEMS,
  NAV_BAR_PROVIDER_PATH_ITEMS,
  NAV_BAR_USER_PATH_ITEMS,
} from "../../../constant/path";
import LinkTab from "../LinkTab/LinkTab";

function NavigationItems(props) {
  const { role, isAuthenticated, currentPath } = props;

  return (
    <Tabs variant="fullWidth" value={currentPath}>
      {!isAuthenticated
        ? NAV_BAR_DEFAULT_PATH_ITEMS.map((item) => (
            <LinkTab
              key={item.path}
              label={item.label}
              to={item.path}
              value={item.path}
            />
          ))
        : null}
      {isAuthenticated && role === AUTH_ROLE.user
        ? NAV_BAR_USER_PATH_ITEMS.map((item) => (
            <LinkTab
              key={item.path}
              label={item.label}
              to={item.path}
              value={item.path}
            />
          ))
        : null}
      {isAuthenticated && role === AUTH_ROLE.provider
        ? NAV_BAR_PROVIDER_PATH_ITEMS.map((item) => (
            <LinkTab
              key={item.path}
              label={item.label}
              to={item.path}
              value={item.path}
            />
          ))
        : null}
    </Tabs>
  );
}

export default NavigationItems;
