import React from "react";
import classes from "./Products.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "./ProductCard/ProductCard";
import { productList } from "../../../constant/homepage";

function Products(props) {
  return (
    <React.Fragment>
      <SectionTitle title={"Just a few of our popular services"} />
      <div className={classes.container}>
        {productList.map((item) => (
          <ProductCard item={item} key={item.name} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Products;
