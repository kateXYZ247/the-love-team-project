import React, { useState } from "react";
import { updateObject } from "../../../shared/utility";
import "react-credit-cards/es/styles-compiled.css";
import OrderSummary from "../../../components/Order/OrderSummary/OrderSummary";
import CreditCardInfo from "../../../components/Order/CreditCardInfo/CreditCardInfo";
import { Box, Grid } from "@material-ui/core";
import TopAction from "../../../components/Order/TopAction/TopAction";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../../shared/creditCardFormat";
import BottomAction from "../../../components/Order/BottomAction/BottomAction";
import { orderCreditCardPageButtonText } from "../../../constant/order";
import OrderConfirmationDialog from "../../../components/Order/OrderConfirmationDialog/OrderConfirmationDialog";
import { checkValidity } from "../../../shared/utility";

function PaymentInfo(props) {
  const {
    order,
    orderServicesCount,
    onUpdatePaymentInfo,
    onPlaceOrder,
    onAppointmentModalOpen,
    onSetBackStatus,
    onResetStatus,
  } = props;

  const [creditCard, setCreditCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [validCreditInfo, setValidCreditInfo] = useState({
    cvc: "initial",
    expiry: "initial",
    name: "initial",
    number: "initial",
  });
  const [openConfirmation, setOpenConfirmation] = useState(false);

  function validateCreditInfo(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValidCreditInfo((prevState) =>
      updateObject(prevState, { [name]: checkValidity(name, value) })
    );
  }

  // function validateCreditNumber(e) {
  //   const value = e.target.value;
  //   setValidCreditNumber(checkValidity("creditNumber", value));
  // }
  //
  // function validateCreditName(e) {
  //   const value = e.target.value;
  //   setValidCreditName(checkValidity("name", value));
  // }
  // function validateCreditDate(e) {
  //   const value = e.target.value;
  //   setValidCreditDate(checkValidity("creditDate", value));
  // }
  // function validateCreditCVC(e) {
  //   const value = e.target.value;
  //   setValidCreditCVC(checkValidity("creditCVC", value));
  // }

  const creditCardInputChangeHandler = (e) => {
    const { name } = e.target;
    if (name === "number") {
      e.target.value = formatCreditCardNumber(e.target.value);
    } else if (name === "expiry") {
      e.target.value = formatExpirationDate(e.target.value);
    } else if (name === "cvc") {
      e.target.value = formatCVC(e.target.value);
    }

    setCreditCard((prevState) =>
      updateObject(prevState, { [name]: e.target.value })
    );
    setValidCreditInfo((prevState) => updateObject(prevState, { [name]: "" }));
  };

  const focusChangeHandler = (e) => {
    setCreditCard((prevState) =>
      updateObject(prevState, { focus: e.target.name })
    );
  };

  const nextButtonClickedHandler = () => {
    if (orderServicesCount !== 0) {
      if (
        validCreditInfo.expiry ||
        validCreditInfo.name ||
        validCreditInfo.number ||
        validCreditInfo.cvc
      ) {
        setValidCreditInfo((prevState) =>
          updateObject(prevState, {
            expiry: checkValidity("expiry", creditCard.expiry),
          })
        );
        setValidCreditInfo((prevState) =>
          updateObject(prevState, {
            name: checkValidity("name", creditCard.name),
          })
        );
        setValidCreditInfo((prevState) =>
          updateObject(prevState, {
            number: checkValidity("number", creditCard.number),
          })
        );
        setValidCreditInfo((prevState) =>
          updateObject(prevState, {
            cvc: checkValidity("cvc", creditCard.cvc),
          })
        );
      } else {
        const card = `${creditCard.number},${creditCard.cvc},${creditCard.expiry},${creditCard.name}`;
        onUpdatePaymentInfo(card);
        setOpenConfirmation(true);
      }
    } else {
      onAppointmentModalOpen(true);
    }
  };

  const dialogClosedHandler = () => {
    setOpenConfirmation(false);
  };

  const orderPlacedHandler = () => {
    setOpenConfirmation(false);
    onPlaceOrder();
  };

  return (
    <React.Fragment>
      <Box my={2}>
        <TopAction
          onClickBack={onSetBackStatus}
          onClickCancel={onResetStatus}
        />
      </Box>
      <OrderConfirmationDialog
        open={openConfirmation}
        onClose={dialogClosedHandler}
        onConfirm={orderPlacedHandler}
        price={order.totalPrice}
      />
      <Grid container justify="space-around">
        <Grid item xs={11} lg={6}>
          <CreditCardInfo
            creditCard={creditCard}
            onFocusChange={focusChangeHandler}
            onInputChange={creditCardInputChangeHandler}
            // validCreditNumber={validCreditNumber}
            // checkCreditNumber={validateCreditNumber}
            // validCreditName={validCreditName}
            // checkCreditName={validateCreditName}
            // validCreditDate={validCreditDate}
            // checkCreditDate={validateCreditDate}
            // validCreditCVC={validCreditCVC}
            // checkCreditCVC={validateCreditCVC}
            validCreditInfo={validCreditInfo}
            checkCreditInfo={validateCreditInfo}
          />
        </Grid>
        <Grid item xs={11} lg={4}>
          <OrderSummary order={order} />
        </Grid>
      </Grid>
      <BottomAction
        buttonText={orderCreditCardPageButtonText}
        numServices={orderServicesCount}
        onEditCart={onAppointmentModalOpen}
        onClickNext={nextButtonClickedHandler}
      />
    </React.Fragment>
  );
}

export default PaymentInfo;
