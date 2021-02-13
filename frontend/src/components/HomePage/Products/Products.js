import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "./ProductCard/ProductCard";
import { productList } from "../../../constant/homepage";
import Grid from "@material-ui/core/Grid";

function Products(props) {
  return (
    <Grid container justify="center" spacing={5}>
      <SectionTitle title={"Just a few of our popular services"} />
      {productList.map((item) => (
        <ProductCard item={item} key={item.name} />
      ))}
    </Grid>
  );
}

export default Products;
