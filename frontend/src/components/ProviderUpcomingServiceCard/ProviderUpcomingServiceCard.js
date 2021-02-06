import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import UpcomingServiceItem from "./UpcomingServiceCardItem/UpcomingServiceItem";
import Button from "@material-ui/core/Button";
import {
  LOCAL_DATETIME_OPTIONS,
  LOCAL_TIME_OPTIONS,
} from "../../constant/constant";
import {
  SERVICE_CANCELABLE_MIN_DAYS,
  SERVICE_START_MIN_HOURS,
  SERVICE_STATUS,
} from "../../constant/service";

function ProviderUpcomingServiceCard(props) {
  const { service, onAction } = props;

  const startTime = new Date(service.startTime);
  const currentTime = new Date();
  // cancel button
  const cancelButton =
    startTime - currentTime > SERVICE_CANCELABLE_MIN_DAYS ? (
      <Box component={"span"} mx={1}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onAction(SERVICE_STATUS.canceled)}
        >
          Cancel
        </Button>
      </Box>
    ) : null;

  // action button
  let actionButton = null;
  if (service.status === SERVICE_STATUS.started) {
    actionButton = (
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAction(SERVICE_STATUS.ended)}
      >
        End
      </Button>
    );
  } else if (
    service.status === SERVICE_STATUS.accepted &&
    startTime - currentTime < SERVICE_START_MIN_HOURS
  ) {
    actionButton = (
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAction(SERVICE_STATUS.started)}
      >
        Start
      </Button>
    );
  }
  return (
    <Grid item xs={11} sm={8}>
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={2}>
            <Grid container spacing={0}>
              <UpcomingServiceItem
                fontSize="h6"
                label="Service"
                value={service.productName}
              />
              <UpcomingServiceItem
                fontSize="h6"
                label="Date"
                value={
                  service.startTime.toLocaleString([], LOCAL_DATETIME_OPTIONS) +
                  " - " +
                  service.endTime.toLocaleString([], LOCAL_TIME_OPTIONS)
                }
              />
              <UpcomingServiceItem
                labelLgWidth={1}
                valueLgWidth={11}
                label="Location"
                value={service.address}
              />
              <UpcomingServiceItem
                label="Direction"
                value={service.direction ? service.direction : "None"}
              />
              <UpcomingServiceItem
                label="Pets"
                value={service.pets ? service.pets : "None"}
              />
              <UpcomingServiceItem
                labelLgWidth={1}
                valueLgWidth={11}
                label="Note"
                value={service.note ? service.note : "None"}
              />
              <Grid item xs={12} lg={6}>
                <Box mt={3}>
                  {cancelButton}

                  <Box component={"span"} mx={1}>
                    {actionButton}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default ProviderUpcomingServiceCard;
