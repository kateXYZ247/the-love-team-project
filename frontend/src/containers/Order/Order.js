import React, { useState } from "react";
import OrderInfo from "./OrderInfo/OrderInfo";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import AppointmentsModal from "../../components/Order/AppointmentsModal/AppointmentsModal";
import { ORDER_STATUS } from "../../constant/order";
import OrderConfirmation from "../../components/Order/OrderConfirmation/OrderConfirmation";

function Order(props) {
  const { order, orderStatus, loading } = props;
  const {
    onUpdateServiceInfo,
    onUpdatePaymentInfo,
    onDeleteFromCart,
    onSetBackStatus,
    onResetStatus,
  } = props;
  const orderTime =
    order.services.length === 0 ? new Date() : order.services[0].startTime;
  let orderServicesCount = order.services.length;

  const [showAppointments, setShowAppointments] = useState(false);

  const appointmentModalOpenedHandler = () => {
    setShowAppointments(true);
  };

  const appointmentModalClosedHandler = () => {
    setShowAppointments(false);
  };

  const newServicesClickedHandler = () => {
    onResetStatus();
    setShowAppointments(false);
  };

  let content = <div>Products</div>;
  switch (orderStatus) {
    case ORDER_STATUS.FILL_DATE_ADDRESS:
      content = (
        <OrderInfo
          onUpdateServiceInfo={onUpdateServiceInfo}
          orderServicesCount={orderServicesCount}
          onAppointmentModalOpen={appointmentModalOpenedHandler}
          onSetBackStatus={onSetBackStatus}
          onResetStatus={onResetStatus}
        />
      );
      break;
    case ORDER_STATUS.FILL_PAYMENT:
      content = (
        <PaymentInfo
          onUpdatePaymentInfo={onUpdatePaymentInfo}
          orderServicesCount={orderServicesCount}
          onAppointmentModalOpen={appointmentModalOpenedHandler}
          onSetBackStatus={onSetBackStatus}
          onResetStatus={onResetStatus}
          order={order}
        />
      );
      break;
    case ORDER_STATUS.CONFIRMED:
      content = <OrderConfirmation orderTime={orderTime} />;
      break;
    case ORDER_STATUS.ADD_TO_CART:
    default:
      content = <div>Products</div>;
  }

  return (
    <React.Fragment>
      <AppointmentsModal
        open={showAppointments}
        onAddServices={newServicesClickedHandler}
        onClose={appointmentModalClosedHandler}
        onDeleteItem={onDeleteFromCart}
        order={order}
      />
      {content}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    orderStatus: state.order.status,
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
    onDeleteFromCart: (productIndex) =>
      dispatch(actions.deleteFromCart(productIndex)),
    onSetBackStatus: () => dispatch(actions.setBackStatus()),
    onResetStatus: () => dispatch(actions.resetStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
