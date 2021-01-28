import React from "react";
import { productList } from "../../../constant/products";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductCard from '../ProductCard/ProductCard';

const useStyles = makeStyles((theme) => ({
  container: {
  },
}));

function ProductsGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container container direction="row" justify="center" alignItems="flex-start">
        <Grid item>
          <CategoryCard title={"BLOWOUTS"}/>
          {productList.filter(item => item.category === "Blowouts").map((item) => (
          <ProductCard item={item} key={item.name} />
          ))}
        </Grid>
        <Grid item>
          <CategoryCard title={"HAIRCUTS"}/>
          {productList.filter(item => item.category === "Haircuts").map((item) => (
          <ProductCard item={item} key={item.name} />
          ))}         
          </Grid>
        <Grid item>
          <CategoryCard title={"MAKEUP"}/>
          {productList.filter(item => item.category === "Makeup").map((item) => (
          <ProductCard item={item} key={item.name} />
          ))}
        </Grid>
        <Grid item>
          <CategoryCard title={"NAILS"}/>
          {productList.filter(item => item.category === "Nails").map((item) => (
          <ProductCard item={item} key={item.name} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductsGrid;

