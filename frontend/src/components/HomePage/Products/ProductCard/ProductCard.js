import React from "react";
import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { PATH_ORDER } from "../../../../constant/path";
import ColorButton from "../../../UI/Buttons/ColorButton";

function ProductCard(props) {
  const { name, description, price } = props.item;
  return (
    <div className={classes.container}>
      <div className={classes.name}>{name}</div>
      <div className={classes.description}>{description}</div>
      <div className={classes.button}>
        <ColorButton
          color="primary"
          component={Link}
          to={PATH_ORDER}
          size="large"
          className={classes.button}
          variant="contained"
        >
          Starting at ${price.toFixed(0)}
        </ColorButton>
      </div>
    </div>
  );
}

export default ProductCard;
