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
            <Grid container spacing={2}>
              <Grid item xs={11} lg={6}>
                <UpcomingServiceItem
                  label="Service"
                  value={service.productName}
                  fontSize={"h6"}
                  textColor="textPrimary"
                />
              </Grid>
              <Grid item xs={11} lg={6}>
                <UpcomingServiceItem
                  label="Date"
                  value={service.startTime.toLocaleString()}
                  fontSize={"h6"}
                  textColor="textPrimary"
                />
              </Grid>
              <Grid item xs={11} lg={6}>
                <UpcomingServiceItem
                  label="Location"
                  value={service.address}
                  fontSize={"body1"}
                  textColor="textPrimary"
                />
              </Grid>
              <Grid item xs={11} lg={6}>
                <UpcomingServiceItem
                  label="Direction"
                  value={service.direction ? service.direction : "None"}
                  fontSize={"body1"}
                  textColor="textPrimary"
                />
              </Grid>
              <Grid item xs={11} lg={6}>
                <UpcomingServiceItem
                  label="Pets"
                  value={service.pets ? service.pets : "None"}
                  fontSize={"body1"}
                  textColor="textPrimary"
                />
              </Grid>
              <Grid item xs={11} lg={6}>
                <UpcomingServiceItem
                  label="Note"
                  value={service.note ? service.note : "None"}
                  fontSize={"body1"}
                  textColor="textPrimary"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button variant="outlined" color="primary" onClick={onAction}>
                  {actionButtonText}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default ProviderUpcomingServiceCard;
