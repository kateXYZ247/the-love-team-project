import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Paper, Typography } from "@material-ui/core";
import { LOCAL_SHORT_TIME_OPTIONS } from "../../constant/constant";
import SmallGoogleMap from "../SmallGoogleMap/SmallGoogleMap";
import ColorButton from "../UI/Buttons/ColorButton";

function RequestCard(props) {
  const { request, onAccept, onDecline } = props;
  return (
    <Grid item xs={12}>
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5} container justify="center">
                <Box align="center">
                  <Typography variant="h6">{request.productName}</Typography>
                  <Typography variant="h6">
                    {request.startTime.toDateString()}
                  </Typography>
                  <Typography variant="h6">
                    {request.startTime.toLocaleString(
                      [],
                      LOCAL_SHORT_TIME_OPTIONS
                    ) +
                      " - " +
                      request.endTime.toLocaleString(
                        [],
                        LOCAL_SHORT_TIME_OPTIONS
                      )}
                  </Typography>
                  <Box my={2} />
                  {request.pets && (
                    <Typography variant="body1">
                      Pets: {request.pets}
                    </Typography>
                  )}
                  <Box mt={2}>
                    <Grid item container spacing={2} justify="space-around">
                      <Grid item xs={6}>
                        <ColorButton
                          color="primary"
                          variant="contained"
                          onClick={onAccept}
                        >
                          Accept
                        </ColorButton>
                      </Grid>
                      <Grid item xs={6}>
                        <ColorButton
                          variant="outlined"
                          color="secondary"
                          onClick={onDecline}
                        >
                          Decline
                        </ColorButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} container justify="center">
                <SmallGoogleMap
                  center={{
                    lat: request.latitude,
                    lng: request.longitude,
                  }}
                  circleCenters={[
                    {
                      lat: request.latitude,
                      lng: request.longitude,
                      productName: request.productName,
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default RequestCard;
