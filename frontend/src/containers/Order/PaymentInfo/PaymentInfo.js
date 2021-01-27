import React, { useState } from "react";
import { updateObject } from "../../../shared/utility";
import "react-credit-cards/es/styles-compiled.css";
import OrderSummary from "../../../components/Order/OrderSummary/OrderSummary";
import CreditCardInfo from "../../../components/Order/CreditCardInfo/CreditCardInfo";
import { Box } from "@material-ui/core";
import TopAction from "../../../components/Order/TopAction/TopAction";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../../shared/creditCardFormat";

function PaymentInfo(props) {
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

  return (
    <React.Fragment>
      <Box mt={2}>
        <TopAction />
      </Box>
      <CreditCardInfo
        creditCard={creditCard}
        onFocusChange={focusChangeHandler}
        onInputChange={creditCardInputChangeHandler}
      />
      <OrderSummary />
    </React.Fragment>
  );
}

export default PaymentInfo;
