import React from "react";
import CardTitle from "../CardTitle/CardTitle";
import { Box, Card, CardContent, Grid } from "@material-ui/core";

function OrderSummary(props) {
  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={6}>
        <Card>
          <CardTitle
            title="Appointment Summary"
            subtitle="Review your details carefully"
          />
          <CardContent></CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default OrderSummary;
