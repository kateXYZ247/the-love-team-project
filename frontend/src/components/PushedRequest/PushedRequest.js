import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Paper, Typography } from "@material-ui/core";
import { LOCAL_SHORT_TIME_OPTIONS } from "../../constant/constant";
import Button from "@material-ui/core/Button";
import SmallGoogleMap from "../SmallGoogleMap/GoogleMap";
import { MAP_RANDOM_OFFSET_AMPLITUDE } from "../../constant/service";

function PushedRequest(props) {
  const { request, onAccept, onDecline } = props;
  return (
    <Grid item xs={12}>
      <Box mt={2}>
        <Paper elevation={2}>
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
                  {request.pets && (
                    <Typography variant="h6">{request.pets}</Typography>
                  )}
                  <Grid item container spacing={2} justify="space-around">
                    <Grid item xs={6}>
                      <Box mx={1} my={1} textAlign="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={onAccept}
                        >
                          Accept
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box mx={1} my={1} textAlign="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={onDecline}
                        >
                          Decline
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} sm={7} container justify="center">
                <SmallGoogleMap
                  center={{
                    lat:
                      request.latitude +
                      Math.random() * MAP_RANDOM_OFFSET_AMPLITUDE,
                    lng:
                      request.longitude +
                      Math.random() * MAP_RANDOM_OFFSET_AMPLITUDE,
                  }}
                  circleCenter={{
                    lat:
                      request.latitude +
                      Math.random() * MAP_RANDOM_OFFSET_AMPLITUDE,
                    lng:
                      request.longitude +
                      Math.random() * MAP_RANDOM_OFFSET_AMPLITUDE,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default PushedRequest;
