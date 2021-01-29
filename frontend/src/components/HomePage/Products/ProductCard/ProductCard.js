import React from "react";
import classes from "./ProductCard.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { name, description, price } = props.item;
  return (
    <div className={classes.container}>
      <div className={classes.name}>{name}</div>
      <div className={classes.description}>{description}</div>
      <div className={classes.button}>
        <Button
          component={Link}
          to={"/order"}
          size="large"
          className={classes.button}
          color="primary"
          variant="contained"
        >
          Starting at ${price.toFixed(0)}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
