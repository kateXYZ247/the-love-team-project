import React, { useEffect, useState } from "react";
import OrderInfo from "./OrderInfo/OrderInfo";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import AppointmentsModal from "../../components/Order/AppointmentsModal/AppointmentsModal";
import { ORDER_STATUS } from "../../constant/order";
import OrderConfirmation from "../../components/Order/OrderConfirmation/OrderConfirmation";
import Products from "./Products/Products";
import { Redirect } from "react-router-dom";
import { PATH_LOGIN, PATH_ORDER } from "../../constant/path";

function Order(props) {
  const { order, orderStatus, isAuthenticated } = props;
  const {
    onSetRedirectPath,
    onUpdateServiceInfo,
    onSwitchToPayment,
    onUpdatePaymentInfo,
    onPlaceOrder,
    onDeleteFromCart,
    onSetBackStatus,
    onResetStatus,
    onUpdateCart,
  } = props;

  // set redirect path to <Order>
  useEffect(() => {
    onSetRedirectPath(PATH_ORDER);
  }, [onSetRedirectPath]);

  // get order information from store and pass to child
  const orderServicesCount = order.services.length;
  const oldOrderDate = order.startTime;
  const oldAddress = order.address;
  const oldApartment = order.apartment;
  const oldPet = order.pet;
  const oldDirection = order.direction;
  const oldAddressType = order.addressType;

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

  // always save user input, but only switch to payment page if user is authenticated
  const dateAddressUpdatedHandler = (date, addressObject) => {
    onUpdateServiceInfo(date, addressObject);
    if (isAuthenticated) {
      onSwitchToPayment();
    } else {
      props.history.push(PATH_LOGIN);
    }
  };

  let content;
  switch (orderStatus) {
    case ORDER_STATUS.FILL_DATE_ADDRESS:
      content = (
        <OrderInfo
          oldOrderDate={oldOrderDate}
          oldAddress={oldAddress}
          oldApartment={oldApartment}
          oldPet={oldPet}
          oldDirection={oldDirection}
          oldAddressType={oldAddressType}
          onUpdateServiceInfo={dateAddressUpdatedHandler}
          orderServicesCount={orderServicesCount}
          onAppointmentModalOpen={appointmentModalOpenedHandler}
          onSetBackStatus={onSetBackStatus}
          onResetStatus={onResetStatus}
        />
      );
      break;
    case ORDER_STATUS.FILL_PAYMENT:
      if (!isAuthenticated) {
        content = <Redirect to={PATH_LOGIN} />;
      } else {
        content = (
          <PaymentInfo
            onUpdatePaymentInfo={onUpdatePaymentInfo}
            onPlaceOrder={onPlaceOrder}
            orderServicesCount={orderServicesCount}
            onAppointmentModalOpen={appointmentModalOpenedHandler}
            onSetBackStatus={onSetBackStatus}
            onResetStatus={onResetStatus}
            order={order}
          />
        );
      }
      break;
    case ORDER_STATUS.CONFIRMED:
      content = (
        <OrderConfirmation orderTime={oldOrderDate} onUnmount={onResetStatus} />
      );
      break;
    case ORDER_STATUS.ADD_TO_CART:
    default:
      content = (
        <Products
          onUpdateCart={onUpdateCart}
          orderServicesCount={orderServicesCount}
          onAppointmentModalOpen={appointmentModalOpenedHandler}
        />
      );
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
    isAuthenticated: state.auth.token !== null,
    orderStatus: state.order.status,
    order: state.order.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
    onUpdateCart: () => dispatch(actions.updateCart()),
    onUpdateServiceInfo: (startTime, address) =>
      dispatch(actions.updateServiceTimeAddress(startTime, address)),
    onSwitchToPayment: () => dispatch(actions.switchToPayment()),
    onUpdatePaymentInfo: (creditCard) =>
      dispatch(actions.updatePaymentInfo(creditCard)),
    onPlaceOrder: (order) => dispatch(actions.placeOrder(order)),
    onDeleteFromCart: (productIndex) =>
      dispatch(actions.deleteFromCart(productIndex)),
    onSetBackStatus: () => dispatch(actions.setBackStatus()),
    onResetStatus: () => dispatch(actions.resetStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
