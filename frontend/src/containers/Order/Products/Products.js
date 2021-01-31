import React, { useEffect } from "react";
import ProductsComponent from "../../../components/Products/Products";
import { orderProductsPageButtonText } from "../../../constant/order";
import BottomAction from "../../../components/Order/BottomAction/BottomAction";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import ProgressCircle from "../../../components/UI/ProgressCircle/ProgressCircle";

function Products(props) {
  const {
    loading,
    productList,
    onFetchProducts,
    orderServicesCount,
    onAppointmentModalOpen,
    onUpdateCart,
    onMessageClose,
    addProductToCart,
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
        <ProductsComponent
          productList={productList}
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
