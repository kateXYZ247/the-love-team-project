import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { LOCAL_SHORT_TIME_OPTIONS } from "../../constant/constant";
import {
  SERVICE_CANCELABLE_MIN_DAYS,
  SERVICE_START_MIN_HOURS,
  SERVICE_STATUS,
} from "../../constant/service";
import SmallGoogleMap from "../SmallGoogleMap/SmallGoogleMap";
import ColorButton from "../UI/Buttons/ColorButton";

function ProviderUpcomingServiceCard(props) {
  const { service, providerLocation, onAction } = props;

  const startTime = new Date(service.startTime);
  const currentTime = new Date();
  const cancelable = startTime - currentTime > SERVICE_CANCELABLE_MIN_DAYS;

  // cancel button
  const cancelButton = cancelable ? (
    <Box component={"span"} mx={1}>
      <ColorButton
        variant="outlined"
        color="secondary"
        onClick={() => onAction(SERVICE_STATUS.canceled)}
      >
        Cancel
      </ColorButton>
    </Box>
  ) : null;

  // action button
  let actionButton = null;
  if (service.status === SERVICE_STATUS.started) {
    actionButton = (
      <ColorButton
        variant="contained"
        color="primary"
        onClick={() => onAction(SERVICE_STATUS.ended)}
      >
        End
      </ColorButton>
    );
  } else if (
    service.status === SERVICE_STATUS.accepted &&
    startTime - currentTime < SERVICE_START_MIN_HOURS
  ) {
    actionButton = (
      <ColorButton
        variant="contained"
        color="primary"
        onClick={() => onAction(SERVICE_STATUS.started)}
      >
        Start
      </ColorButton>
    );
  }

  // prepare map depends on service status
  let map;
  const center = {
    lat: service.latitude,
    lng: service.longitude,
  };
  if (cancelable) {
    map = <SmallGoogleMap center={center} circleCenter={center} />;
  } else if (service.status !== SERVICE_STATUS.started) {
    const destination = service.latitude + "," + service.longitude;
    const origin = providerLocation.latitude + "," + providerLocation.longitude;
    map = (
      <SmallGoogleMap
        center={center}
        origin={origin}
        destination={destination}
      />
    );
  } else {
    map = (
      <SmallGoogleMap
        center={center}
        markerCenter={center}
        markerTitle={service.address}
      />
    );
  }

  return (
    <Grid item xs={12} md={8} lg={6} xl={4} container justify="center">
      <Grid item xs={12}>
        <Box mt={2}>
          <Paper elevation={5}>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5} container justify="center">
                  <Box align="center">
                    <Typography variant="h6">{service.productName}</Typography>
                    <Typography variant="h6">
                      {service.startTime.toDateString()}
                    </Typography>
                    <Typography variant="h6">
                      {service.startTime.toLocaleString(
                        [],
                        LOCAL_SHORT_TIME_OPTIONS
                      ) +
                        " - " +
                        service.endTime.toLocaleString(
                          [],
                          LOCAL_SHORT_TIME_OPTIONS
                        )}
                    </Typography>
                    <Box my={2} />
                    {service.pets && (
                      <Typography variant="body1">
                        Pets: {service.pets}
                      </Typography>
                    )}
                    {!cancelable && service.direction && (
                      <Typography variant="body1">
                        Direction: {service.direction}
                      </Typography>
                    )}
                    {!cancelable && service.apartment && (
                      <Typography variant="body1">
                        Apartment: {service.apartment}
                      </Typography>
                    )}
                    {service.note && (
                      <Typography variant="body1">
                        Note: {service.note}
                      </Typography>
                    )}
                    <Box mt={2}>
                      <Grid item container spacing={2} justify="space-around">
                        <Grid item xs={6}>
                          {actionButton}
                        </Grid>
                        <Grid item xs={6}>
                          {cancelButton}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={7} container justify="center">
                  {map}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProviderUpcomingServiceCard;
