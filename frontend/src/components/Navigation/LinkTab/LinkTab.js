import React from "react";
import { Tab } from "@material-ui/core";
import { Link } from "react-router-dom";

function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

export default LinkTab;
