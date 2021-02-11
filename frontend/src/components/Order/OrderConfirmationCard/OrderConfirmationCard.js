import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Paper, Typography } from "@material-ui/core";
import { LOCAL_SHORT_TIME_OPTIONS } from "../../../constant/constant";
import SmallGoogleMap from "../../SmallGoogleMap/SmallGoogleMap";

function OrderConfirmationCard(props) {
  const { order } = props;
  return (
    <Grid item xs={12}>
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5} container justify="center">
                <Box align="center">
                  <Typography variant="h6">
                    {order.services[0].startTime.toDateString()}
                  </Typography>
                  <Typography variant="h6">
                    {order.services[0].startTime.toLocaleString(
                      [],
                      LOCAL_SHORT_TIME_OPTIONS
                    )}
                  </Typography>
                  <Box my={2}>
                    {order.services.map((serv, index) => (
                      <Typography key={index} variant="body1">
                        {serv.productName}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} container justify="center">
                <SmallGoogleMap
                  center={{
                    lat: order.services[0].latitude,
                    lng: order.services[0].longitude,
                  }}
                  markerCenter={{
                    lat: order.services[0].latitude,
                    lng: order.services[0].longitude,
                  }}
                  markerTitle={order.services[0].address}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default OrderConfirmationCard;
