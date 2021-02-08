import React from "react";
import Grid from "@material-ui/core/Grid";
import CategoryCard from "../CategoryCard/CategoryCard";
import ProductCard from "../ProductCard/ProductCard";

function ProductsGrid(props) {
  const {
    productList,
    onUpdateCart,
    orderServicesCount,
    onAppointmentModalOpen,
    productDetailOpen,
    productDetailClose,
    onSetProduct,
  } = props;

  function cardGenerator(category) {
    return productList
      .filter((product) => product.category === category)
      .sort(function (p1, p2) {
        return parseInt(p1.productId) - parseInt(p2.productId);
      })
      .map((product) => (
        <Grid container justify={"center"} key={product.productId}>
          <ProductCard
            product={product}
            productDetailOpen={productDetailOpen}
            productDetailClose={productDetailClose}
            onUpdateCart={onUpdateCart}
            orderServicesCount={orderServicesCount}
            onAppointmentModalOpen={onAppointmentModalOpen}
            onSetProduct={onSetProduct}
          />
        </Grid>
      ));
  }

  return (
    <Grid container direction="row" justify="space-around" spacing={0}>
      <Grid item xs={11} md={5} lg={3}>
        <CategoryCard title={"BLOWOUTS"} />
        {cardGenerator("Blowouts")}
      </Grid>
      <Grid item xs={11} md={5} lg={3}>
        <CategoryCard title={"HAIRCUTS"} />
        {cardGenerator("Haircuts")}
      </Grid>
      <Grid item xs={11} md={5} lg={3}>
        <CategoryCard title={"MAKEUP"} />
        {cardGenerator("Makeup")}
      </Grid>
      <Grid item xs={11} md={5} lg={3}>
        <CategoryCard title={"NAILS"} />
        {cardGenerator("Nails")}
      </Grid>
    </Grid>
  );
}

export default ProductsGrid;
