import React from "react";
import classes from "./Products.module.css";
import ProductsComponent from "../../components/Products/Products";

function Products(props) {
  return (
    <div className={classes.container}>
      <ProductsComponent />
    </div>
  );
}

export default Products;
