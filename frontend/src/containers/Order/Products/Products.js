import React, { useEffect } from "react";
import ProductsComponent from "../../../components/Products/Products";
import { orderProductsPageButtonText } from "../../../constant/order";
import BottomAction from "../../../components/Order/BottomAction/BottomAction";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import ProgressCircle from "../../../components/UI/ProgressCircle/ProgressCircle";
import SnackbarMessage from "../../../components/UI/SnackbarMessage/SnackbarMessage";

function Products(props) {
  const {
    loading,
    productList,
    onFetchProducts,
    orderServicesCount,
    onAppointmentModalOpen,
    onUpdateCart,
    message,
    messageType,
    onMessageClose,
  } = props;

  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  const nextButtonClickedHandler = () => {
    onUpdateCart();
  };

  return loading ? (
    <ProgressCircle label={"Loading Product List ..."} />
  ) : (
    <React.Fragment>
      {message !== null ? (
        <SnackbarMessage
          type={messageType}
          message={message}
          onClose={onMessageClose}
        />
      ) : null}
      <ProductsComponent productList={productList} />
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
    message: state.message.message,
    messageType: state.message.messageType,
    productList: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
    onMessageClose: () => dispatch(actions.clearMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
