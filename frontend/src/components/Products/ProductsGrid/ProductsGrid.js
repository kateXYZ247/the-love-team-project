import React from "react";
import { productList } from "../../../constant/products";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductCard from '../ProductCard/ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    elevation: 3,
    variant: 'outlined',
  },
}));

function ProductsGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <CategoryCard title={"BLOWOUTS"}/>
              {productList.filter(item => item.category === "Blowouts").map((item) => (
              <ProductCard item={item} key={item.name} />
              ))}
            </Grid>
            <Grid item xs={6} sm={3}>
              <CategoryCard title={"HAIRCUTS"}/>
              {productList.filter(item => item.category === "Haircuts").map((item) => (
              <ProductCard item={item} key={item.name} />
              ))}         
              </Grid>
            <Grid item xs={6} sm={3}>
              <CategoryCard title={"MAKEUP"}/>
              {productList.filter(item => item.category === "Makeup").map((item) => (
              <ProductCard item={item} key={item.name} />
              ))}
            </Grid>
            <Grid item xs={6} sm={3}>
              <CategoryCard title={"NAILS"}/>
              {productList.filter(item => item.category === "Nails").map((item) => (
              <ProductCard item={item} key={item.name} />
              ))}
            </Grid>
      </Grid>
    </div>

    </div>
  );
}

export default ProductsGrid;
