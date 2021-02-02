import React from "react";
import CardTitle from "../../UI/CardTitle/CardTitle";
import { Box, Card, CardContent, Divider, Grid } from "@material-ui/core";
import { orderTaxRate, orderGratuityRate } from "../../../constant/order";
import OrderSummaryItem from "./OrderSummaryItem/OrderSummaryItem";

function OrderSummary(props) {
  const { order } = props;
  const map = order.services.reduce(
    (acc, e) => acc.set(e.name, (acc.get(e.name) || 0) + e.productPrice),
    new Map()
  );
  const orderSummary = [...map.entries()];
  const orderSubTotal = order.services.reduce((acc, e) => acc + e.productPrice, 0);
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Card>
          <CardTitle
            title="Appointment Summary"
            subtitle="Review your details carefully"
          />
          <CardContent>
            <Box p={2}>
              {orderSummary.map((item) => (
                <OrderSummaryItem
                  label={item[0]}
                  value={"$ " + item[1].toFixed(2)}
                  fontSize="body1"
                  textColor="textPrimary"
                  key={item[0]}
                />
              ))}
              <Box my={1}>
                <Divider />
              </Box>
              <OrderSummaryItem
                label="Subtotal"
                value={"$ " + orderSubTotal.toFixed(2)}
                fontSize="body1"
                textColor="textSecondary"
              />
              <OrderSummaryItem
                label="Tax"
                value={"$ " + (orderSubTotal * orderTaxRate).toFixed(2)}
                fontSize="body1"
                textColor="textSecondary"
              />
              <OrderSummaryItem
                label="Gratuity"
                value={
                  "$ " +
                  (
                    orderSubTotal *
                    (1 + orderTaxRate) *
                    orderGratuityRate
                  ).toFixed(2)
                }
                fontSize="body1"
                textColor="textSecondary"
              />
              <Box my={1}>
                <Divider />
              </Box>
              <OrderSummaryItem
                label="Total"
                value={"$ " + order.totalPrice.toFixed(2)}
                fontSize="h5"
                textColor="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default OrderSummary;
