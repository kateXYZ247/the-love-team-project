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

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item>
        <CategoryCard title={"BLOWOUTS"} />
        {productList
          .filter((product) => product.category === "Blowouts")
          .map((product) => (
            <ProductCard
              product={product}
              key={product.productId}
              productDetailOpen={productDetailOpen}
              productDetailClose={productDetailClose}
              onUpdateCart={onUpdateCart}
              orderServicesCount={orderServicesCount}
              onAppointmentModalOpen={onAppointmentModalOpen}
              onSetProduct={onSetProduct}
            />
          ))}
      </Grid>
      <Grid item>
        <CategoryCard title={"HAIRCUTS"} />
        {productList
          .filter((product) => product.category === "Haircuts")
          .map((product) => (
            <ProductCard
              product={product}
              key={product.productId}
              productDetailOpen={productDetailOpen}
              productDetailClose={productDetailClose}
              onUpdateCart={onUpdateCart}
              orderServicesCount={orderServicesCount}
              onAppointmentModalOpen={onAppointmentModalOpen}
              onSetProduct={onSetProduct}
            />
          ))}
      </Grid>
      <Grid item>
        <CategoryCard title={"MAKEUP"} />
        {productList
          .filter((product) => product.category === "Makeup")
          .map((product) => (
            <ProductCard
              product={product}
              key={product.productId}
              productDetailOpen={productDetailOpen}
              productDetailClose={productDetailClose}
              onUpdateCart={onUpdateCart}
              orderServicesCount={orderServicesCount}
              onAppointmentModalOpen={onAppointmentModalOpen}
              onSetProduct={onSetProduct}
            />
          ))}
      </Grid>
      <Grid item>
        <CategoryCard title={"NAILS"} />
        {productList
          .filter((product) => product.category === "Nails")
          .map((product) => (
            <ProductCard
              product={product}
              key={product.productId}
              productDetailOpen={productDetailOpen}
              productDetailClose={productDetailClose}
              onUpdateCart={onUpdateCart}
              orderServicesCount={orderServicesCount}
              onAppointmentModalOpen={onAppointmentModalOpen}
              onSetProduct={onSetProduct}
            />
          ))}
      </Grid>
    </Grid>
  );
}

export default ProductsGrid;
