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

function PaymentInfo(props) {
  const {
    order,
    orderServicesCount,
    onUpdatePaymentInfo,
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
  };

  const focusChangeHandler = (e) => {
    setCreditCard((prevState) =>
      updateObject(prevState, { focus: e.target.name })
    );
  };

  const nextButtonClickedHandler = () => {
    const card = `${creditCard.number},${creditCard.cvc},${creditCard.expiry},${creditCard.name}`;
    onUpdatePaymentInfo(card);
  };

  return (
    <React.Fragment>
      <Box my={2}>
        <TopAction
          onClickBack={onSetBackStatus}
          onClickCancel={onResetStatus}
        />
      </Box>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={10} lg={6}>
          <CreditCardInfo
            creditCard={creditCard}
            onFocusChange={focusChangeHandler}
            onInputChange={creditCardInputChangeHandler}
          />
        </Grid>
        <Grid item xs={10} lg={4}>
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
