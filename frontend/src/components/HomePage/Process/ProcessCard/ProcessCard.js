import React from "react";
import classes from "./ProcessCard.module.css";

function ProcessCard(props) {
  const { title, content } = props.item;
  const { bgColor } = props;
  return (
    <div className={classes.container} style={{ backgroundColor: bgColor }}>
      <div className={classes.title}>{title}</div>
      <div className={classes.content}>
        {content.split("\n").map((line) => (
          <p className={classes.line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default ProcessCard;
