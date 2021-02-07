import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "./ProductCard/ProductCard";
import { productList } from "../../../constant/homepage";
import { Grid, Box } from "@material-ui/core";

function Products(props) {
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={12} align="center">
          <Box marginTop="20px">
            <SectionTitle title={"Just a few of our popular services"} />
          </Box>
        </Grid>
        <Grid item xs={12} justify="center">
          <Box display="flex" align="center" margin="50px auto">
            {productList.map((item) => (
              <ProductCard item={item} key={item.name} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Products;
