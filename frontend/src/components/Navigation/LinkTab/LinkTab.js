import React from "react";
import { Tab, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const SmallTab = withStyles({
  root: {
    minWidth: 100, // a number of your choice
    width: 150, // a number of your choice
  },
})(Tab);

function LinkTab(props) {
  return <SmallTab component={Link} {...props} />;
}

export default LinkTab;
