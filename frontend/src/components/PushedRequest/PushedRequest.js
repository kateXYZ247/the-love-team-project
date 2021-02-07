import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import UpcomingServiceItem from "../ProviderUpcomingServiceCard/UpcomingServiceCardItem/UpcomingServiceItem";
import {
  LOCAL_DATETIME_OPTIONS,
  LOCAL_TIME_OPTIONS,
} from "../../constant/constant";
import Button from "@material-ui/core/Button";

function PushedRequest(props) {
  const { request, onAccept, onDecline } = props;
  return (
    <Grid item xs={12}>
      <Box mt={2}>
        <Paper elevation={2}>
          <Box p={2}>
            <Grid container spacing={0}>
              <UpcomingServiceItem
                fontSize="h6"
                label="Service"
                value={request.productName}
              />
              <UpcomingServiceItem
                fontSize="h6"
                label="Date"
                value={
                  request.startTime.toLocaleString([], LOCAL_DATETIME_OPTIONS) +
                  " - " +
                  request.endTime.toLocaleString([], LOCAL_TIME_OPTIONS)
                }
              />
              <UpcomingServiceItem
                labelLgWidth={1}
                valueLgWidth={11}
                label="Location"
                value={request.address}
              />
              <UpcomingServiceItem
                label="Pets"
                value={request.pets ? request.pets : "None"}
              />
              <Grid item container spacing={2} justify="space-around">
                <Grid item xs={5}>
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
                <Grid item xs={5}>
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
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default PushedRequest;
