import React from "react";
import classes from "./Product.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import ProductCard from "./ProductCard/ProductCard";

const productList = [
  {
    name: "Hair Cut",
    description:
      "A personalized consultation and haircut that ends with your favorite blowout",
    price: 100,
  },
  {
    name: "Blow Out",
    description:
      "Wet hair with a blowout and iron work catered to your preferred style.",
    price: 55,
  },
  {
    name: "Manicure",
    description:
      "Choice of our polish or yours with shaping, cuticles, lotion, and option for shellac. ",
    price: 40,
  },
];

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
