import React from "react";
import classes from "./SectionTitle.module.css";

function SectionTitle(props) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{props.title}</div>
      {props.subtitle ? (
        <div className={classes.subtitle}>{props.subtitle}</div>
      ) : null}
    </div>
  );
}

export default SectionTitle;
