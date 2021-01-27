import React from "react";
import OrderInfo from "./OrderInfo/OrderInfo";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PaymentInfo from "./PaymentInfo/PaymentInfo";

function Order(props) {
  const { order, loading } = props;
  const { onUpdateServiceInfo, onUpdatePaymentInfo } = props;
  console.log(onUpdatePaymentInfo);

  return (
    <React.Fragment>
      <OrderInfo onUpdateServiceInfo={onUpdateServiceInfo} />
      <PaymentInfo onUpdatePaymentInfo={onUpdatePaymentInfo} />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateServiceInfo: (time, address) =>
      dispatch(actions.updateServiceTimeAddress(time, address)),
    onUpdatePaymentInfo: (creditCard) =>
      dispatch(actions.updatePaymentInfo(creditCard)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
