import React from "react";
import classes from "./SauceCard.module.css";

function SauceCard(props) {
  const { image, title, content } = props.item;
  return (
    <div className={classes.container}>
      <img className={classes.image} src={image} alt={title} />
      <div className={classes.title}>{title}</div>
      <div className={classes.content}>{content}</div>
    </div>
  );
}

export default SauceCard;
