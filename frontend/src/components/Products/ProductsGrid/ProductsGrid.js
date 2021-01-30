import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CategoryCard from "../CategoryCard/CategoryCard";
import ProductCard from "../ProductCard/ProductCard";

const useStyles = makeStyles(() => ({
  container: {},
}));

function ProductsGrid(props) {
  const { productList } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item>
          <CategoryCard title={"BLOWOUTS"} />
          {productList
            .filter((item) => item.category === "Blowouts")
            .map((item) => (
              <ProductCard item={item} key={item.productId} />
            ))}
        </Grid>
        <Grid item>
          <CategoryCard title={"HAIRCUTS"} />
          {productList
            .filter((item) => item.category === "Haircuts")
            .map((item) => (
              <ProductCard item={item} key={item.productId} />
            ))}
        </Grid>
        <Grid item>
          <CategoryCard title={"MAKEUP"} />
          {productList
            .filter((item) => item.category === "Makeup")
            .map((item) => (
              <ProductCard item={item} key={item.productId} />
            ))}
        </Grid>
        <Grid item>
          <CategoryCard title={"NAILS"} />
          {productList
            .filter((item) => item.category === "Nails")
            .map((item) => (
              <ProductCard item={item} key={item.productId} />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductsGrid;
