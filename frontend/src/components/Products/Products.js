import React from "react";
import classes from "./Products.module.css";
import SectionTitle from "./SectionTitle/SectionTitle";
import ProductsGrid from "./ProductsGrid/ProductsGrid"

function Products(props) {
  return (
    <div className={classes.container}>
      <SectionTitle title={"Select one or multiple services to start booking"} />
      <ProductsGrid />
    </div>
    
  );
}

export default Products;
