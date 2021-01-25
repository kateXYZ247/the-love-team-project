import React from "react";
import OrderInfo from "./OrderInfo/OrderInfo";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

function Order(props) {
  return <OrderInfo />;
}

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (product) => dispatch(actions.addToCart(product)),
    onUpdateServiceInfo: (time, address) =>
      dispatch(actions.updateServiceTimeAddress(time, address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
