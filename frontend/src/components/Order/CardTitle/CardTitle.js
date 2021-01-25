import React from 'react';
import classes from "./CardTitle.module.css";

function CardTitle(props) {
  return <div className={classes.title}>{props.children}</div>;
}

export default CardTitle;