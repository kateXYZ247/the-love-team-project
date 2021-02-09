import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCardOne from "./ProductCard/ProductCardOne";
import ProductCardTwo from "./ProductCard/ProductCardTwo";
import ProductCardThree from "./ProductCard/ProductCardThree";
import { Grid, Box, Card } from "@material-ui/core";

function Products(props) {
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={12} align="center">
          <Box marginTop="20px">
            <SectionTitle title={"Just a few of our popular services"} />
          </Box>
        </Grid>
        <Box width="2000px" marginBottom="50px">
          <Grid container justify="space-around">
            <Grid item xs={12} sm={3} align="center">
              <Card>
                <ProductCardOne />
              </Card>
            </Grid>
            <Grid item xs={12} sm={3} align="center">
              <Card>
                <ProductCardTwo />
              </Card>
            </Grid>
            <Grid item xs={12} sm={3} align="center">
              <Card>
                <ProductCardThree />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default Products;
