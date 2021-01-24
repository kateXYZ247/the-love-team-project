import React from "react";
import classes from "./Footer.module.css";
import { useTheme } from "@material-ui/core/styles";

function Footer(props) {
  const theme = useTheme();
  return (
    <div
      className={classes.container}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <div className={classes.content}>test</div>
      <div className={classes.copyright}>
        Copyright © 2021 The Love Team. - All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
