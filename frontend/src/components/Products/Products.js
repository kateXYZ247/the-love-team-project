import React from "react";
import ProductsGrid from "./ProductsGrid/ProductsGrid";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Products(props) {
  const { productList } = props;
  return (
    <React.Fragment>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h5">
            Select one or multiple services to start booking
          </Typography>
        </Grid>
        <Grid item>
          <ProductsGrid productList={productList} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Products;
