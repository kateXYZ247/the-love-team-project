import React from "react";
import { Box, Typography } from "@material-ui/core";

function OrderConfirmation(props) {
  const { orderTime } = props;
  console.log(orderTime);

  return (
    <Box>
      <Typography variant="h3" align="center">
        WooHoo!
      </Typography>
      <Typography variant="h5" align="center">
        You're all booked for
      </Typography>
      <Typography variant="h5" align="center">
        {orderTime.toDateString() + ", " + orderTime.toLocaleTimeString()}
      </Typography>
    </Box>
  );
}

export default OrderConfirmation;
