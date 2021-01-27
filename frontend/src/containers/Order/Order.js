import React from "react";
import OrderInfo from "./OrderInfo/OrderInfo";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

function Order(props) {
  const { order, loading } = props;
  const { onUpdateServiceInfo } = props;

  const serviceInfoUpdateHandler = (time, address) => {
    onUpdateServiceInfo(time, address);
  };

  return (
    <React.Fragment>
      <OrderInfo serviceInfoUpdateHandler={serviceInfoUpdateHandler} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
