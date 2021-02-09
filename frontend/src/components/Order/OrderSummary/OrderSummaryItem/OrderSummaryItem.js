import React from "react";
import { Grid, Typography } from "@material-ui/core";

function OrderSummaryItem(props) {
  const { label, value, fontSize, textColor } = props;
  return (
    <Grid container justify="space-between">
      <Grid item>
        <Typography variant={fontSize} color={textColor}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={fontSize} color={textColor}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default OrderSummaryItem;
