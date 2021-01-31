import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid/ProductsGrid";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProductDetail from "../../components/Products/ProductDetail/ProductDetail";

function Products(props) {
  const {
    productList,
    onUpdateCart,
    orderServicesCount,
    onAppointmentModalOpen,
    addProductToCart,
  } = props;

  const [showProductDetail, setShowProductDetail] = useState(false);
  const [product, setProduct] = useState('');
  const [clientsCounter, setClientCounter] = useState(0);

  const productDetailOpenedHandler = () => {
    setShowProductDetail(true);
  };

  const productDetailClosedHandler = () => {
    console.log('close')
    setShowProductDetail(false);
  };

  const clientCounterIncrementHandler = () => {
    setClientCounter(clientsCounter + 1)
  };

  const clientCounterDecrementHandler = () => {
    setClientCounter(clientsCounter - 1)
  };

  return (
    <React.Fragment>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h5">
            Select one or multiple services to start booking
          </Typography>
        </Grid>
        <Grid item>
          <ProductsGrid
            productList={productList}
            onSetProduct={setProduct}
            productDetailOpen={productDetailOpenedHandler}
            productDetailClose={productDetailClosedHandler}
            onUpdateCart={onUpdateCart}
            orderServicesCount={orderServicesCount}
            onAppointmentModalOpen={onAppointmentModalOpen}
          />
        </Grid>
      </Grid>
      <ProductDetail
        open={showProductDetail}
        handleClose={productDetailClosedHandler}
        product={product}
        clientsCounter={clientsCounter}
        clientCounterIncrement={clientCounterIncrementHandler}
        clientCounterDecrement={clientCounterDecrementHandler}
        addProductToCart={addProductToCart}
      />

    </React.Fragment>
  );
}

export default Products;
