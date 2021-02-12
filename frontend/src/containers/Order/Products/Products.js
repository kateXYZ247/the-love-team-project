import React, { useEffect, useState } from "react";
import { orderProductsPageButtonText } from "../../../constant/order";
import BottomAction from "../../../components/Order/BottomAction/BottomAction";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import ProgressCircle from "../../../components/UI/ProgressCircle/ProgressCircle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProductDetail from "../../../components/Products/ProductDetail/ProductDetail";
import ProductsGrid from "../../../components/Products/ProductsGrid/ProductsGrid";

function Products(props) {
  const {
    loading,
    productList,
    onFetchProducts,
    orderServicesCount,
    onAppointmentModalOpen,
    onUpdateCart,
    // TODO: add message
    // onMessageClose,
    addProductToCart,
  } = props;

  const [showProductDetail, setShowProductDetail] = useState(false);
  const [product, setProduct] = useState("");
  const [clientsCounter, setClientCounter] = useState(1);

  const productDetailOpenedHandler = () => {
    setShowProductDetail(true);
  };

  const productDetailClosedHandler = () => {
    setShowProductDetail(false);
  };

  const clientCounterIncrementHandler = () => {
    setClientCounter(clientsCounter + 1);
  };

  const clientCounterDecrementHandler = () => {
    setClientCounter(clientsCounter - 1);
  };

  const nextButtonClickedHandler = () => {
    onUpdateCart();
  };

  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  return loading ? (
    <ProgressCircle label={"Loading Product List ..."} />
  ) : (
    <React.Fragment>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h5">
            Select one or multiple services to start booking
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
        setClientCounter={setClientCounter}
        clientCounterIncrement={clientCounterIncrementHandler}
        clientCounterDecrement={clientCounterDecrementHandler}
        addProductToCart={addProductToCart}
      />
      <BottomAction
        buttonText={orderProductsPageButtonText}
        numServices={orderServicesCount}
        onEditCart={onAppointmentModalOpen}
        onClickNext={nextButtonClickedHandler}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.products.loading,
    productList: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
