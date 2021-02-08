import React, { useRef, useState } from "react";
import { Tabs } from "@material-ui/core";
import { AUTH_ROLE } from "../../../constant/auth";
import {
  PATH_APPOINTMENTS,
  PATH_HISTORY,
  PATH_HOME,
  PATH_ORDER,
  PATH_PROVIDER_HISTORY,
  PATH_PROVIDER_LIST_SERVICES,
  PATH_PROVIDER_PROFILE,
  PATH_PROVIDER_UPCOMING_SERVICES,
} from "../../../constant/path";
import LinkTab from "../LinkTab/LinkTab";

function NavigationItems(props) {
  const { role, isAuthenticated } = props;

  const [value, setValue] = useState(1);

  const refTabs = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      variant="fullWidth"
      value={value}
      onChange={handleChange}
      ref={refTabs}
    >
      >
      {role !== AUTH_ROLE.provider ? (
        <LinkTab label={"Home"} to={PATH_HOME} />
      ) : null}
      {role !== AUTH_ROLE.provider ? (
        <LinkTab label={"Book"} to={PATH_ORDER} />
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.user ? (
        <LinkTab label={"Orders"} to={PATH_HISTORY} />
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.user ? (
        <LinkTab label={"Appointments"} to={PATH_APPOINTMENTS} />
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <LinkTab label={"Requests"} to={PATH_PROVIDER_LIST_SERVICES} />
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <LinkTab label={"Services"} to={PATH_PROVIDER_UPCOMING_SERVICES} />
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <LinkTab label={"Histories"} to={PATH_PROVIDER_HISTORY} />
      ) : null}
      {isAuthenticated && role === AUTH_ROLE.provider ? (
        <LinkTab label={"Profile"} to={PATH_PROVIDER_PROFILE} />
      ) : null}
    </Tabs>
  );
}

export default NavigationItems;
