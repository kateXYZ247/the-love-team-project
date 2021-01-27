import React, { useState } from "react";
import OrderInfo from "./OrderInfo/OrderInfo";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import AppointmentsModal from "../../components/Order/AppointmentsModal/AppointmentsModal";

function Order(props) {
  const { order, loading } = props;
  const { onUpdateServiceInfo, onUpdatePaymentInfo, onDeleteFromCart } = props;
  let orderServicesCount = order.services.length;

  const [showAppointments, setShowAppointments] = useState(false);

  const appointmentModalOpenedHandler = () => {
    setShowAppointments(true);
  };

  const appointmentModalClosedHandler = () => {
    setShowAppointments(false);
  };

  const newServicesClickedHandler = () => {
    setShowAppointments(false);
  };

  return (
    <React.Fragment>
      <AppointmentsModal
        open={showAppointments}
        onAddServices={newServicesClickedHandler}
        onClose={appointmentModalClosedHandler}
        onDeleteItem={onDeleteFromCart}
        order={order}
      />
      <OrderInfo
        onUpdateServiceInfo={onUpdateServiceInfo}
        orderServicesCount={orderServicesCount}
        onAppointmentModalOpen={appointmentModalOpenedHandler}
      />
      <PaymentInfo
        onUpdatePaymentInfo={onUpdatePaymentInfo}
        orderServicesCount={orderServicesCount}
        onAppointmentModalOpen={appointmentModalOpenedHandler}
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
    onDeleteFromCart: (productIndex) =>
      dispatch(actions.deleteFromCart(productIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
