import React from "react";
import OrderInfo from "./OrderInfo/OrderInfo";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PaymentInfo from "./PaymentInfo/PaymentInfo";

function Order(props) {
  const { order, loading } = props;
  const { onUpdateServiceInfo, onUpdatePaymentInfo } = props;
  let orderServicesCount = order.services.length;

  return (
    <React.Fragment>
      <OrderInfo
        onUpdateServiceInfo={onUpdateServiceInfo}
        orderServicesCount={orderServicesCount}
      />
      <PaymentInfo
        onUpdatePaymentInfo={onUpdatePaymentInfo}
        orderServicesCount={orderServicesCount}
        order={order}
      />
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
