import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import UpcomingServiceItem from "./UpcomingServiceCardItem/UpcomingServiceItem";
import Button from "@material-ui/core/Button";

function ProviderUpcomingServiceCard(props) {
  const { service, onAction, actionButtonText } = props;
  return (
    <Grid item xs={11} sm={8} lg={7}>
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
                value={service.startTime.toLocaleString()}
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
                <Box my={2}>
                  <Button variant="outlined" color="primary" onClick={onAction}>
                    {actionButtonText}
                  </Button>
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
