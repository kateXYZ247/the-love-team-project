import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { LOCAL_SHORT_TIME_OPTIONS } from "../../constant/constant";
import {
  SERVICE_CANCELABLE_MIN_DAYS,
  SERVICE_STATUS,
} from "../../constant/service";
import { ORDER_STATUS } from "../../constant/order";
import SmallGoogleMap from "../SmallGoogleMap/SmallGoogleMap";
import ColorButton from "../UI/Buttons/ColorButton";

function UpcomingAppointmentCard(props) {
  const { order, onAction } = props;
  const services = order.servs;
  const service = services[0];
  const startTime = new Date(service.startTime);
  const currentTime = new Date();
  const isNotStarted = !services.every(
    (service) =>
      service.status === SERVICE_STATUS.requested ||
      service.status === SERVICE_STATUS.accepted
  );
  const cancelButton =
    startTime - currentTime > SERVICE_CANCELABLE_MIN_DAYS && !isNotStarted ? (
      <Box component={"span"} mx={1}>
        <ColorButton
          variant="outlined"
          color="secondary"
          onClick={() => onAction(ORDER_STATUS.canceled)}
        >
          Cancel
        </ColorButton>
      </Box>
    ) : null;

  return (
    <Grid item xs={12} md={8} lg={6} xl={4} container justify="center">
      <Grid item xs={12}>
        <Box mt={2}>
          <Paper elevation={5}>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5} container justify="center">
                  <Box align="center">
                    <Typography variant="h6">
                      {startTime.toDateString()}
                    </Typography>
                    <Typography variant="h6">
                      {startTime.toLocaleString([], LOCAL_SHORT_TIME_OPTIONS)}
                    </Typography>
                    <Box my={2}>
                      {services.map((serv, index) => (
                        <Typography key={index} variant="body1">
                          {`${serv.productName} (${serv.status})`}
                        </Typography>
                      ))}
                    </Box>
                    <Box my={2}>
                      Total Price: ${order.totalPrice.toFixed(2)}
                    </Box>
                    <Box mt={2}>
                      <Grid item container spacing={2} justify="space-around">
                        <Grid item xs={6}>
                          {cancelButton}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={7} container justify="center">
                  {
                    <SmallGoogleMap
                      center={{
                        lat: services[0].latitude,
                        lng: services[0].longitude,
                      }}
                      markerCenter={{
                        lat: services[0].latitude,
                        lng: services[0].longitude,
                      }}
                      markerTitle={services[0].address}
                    />
                  }
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UpcomingAppointmentCard;
