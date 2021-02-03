import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import UpcomingServiceItem from "./UpcomingServiceCardItem/UpcomingServiceItem";
import Button from "@material-ui/core/Button";

function ProviderUpcomingServiceCard(props) {
  const { service, onContact, onAction, actionButtonText } = props;
  return (
    <Grid item xs={12} md={10}>
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={2}>
            <Grid container spacing={2} justify="space-around">
              <Grid item xs={11} md={7}>
                <Box>
                  <UpcomingServiceItem
                    label="Service"
                    value={service.productName}
                    fontSize={"h6"}
                    textColor="textPrimary"
                  />
                  <UpcomingServiceItem
                    label="Date"
                    value={service.startTime.toLocaleString()}
                    fontSize={"h6"}
                    textColor="textPrimary"
                  />
                  <UpcomingServiceItem
                    label="Location"
                    value={service.address}
                    fontSize={"body1"}
                    textColor="textPrimary"
                  />
                  <UpcomingServiceItem
                    label="Note"
                    value={service.note ? service.note : "None"}
                    fontSize={"body1"}
                    textColor="textPrimary"
                  />
                </Box>
              </Grid>
              <Grid
                container
                item
                xs={11}
                md={5}
                spacing={2}
                alignContent="center"
              >
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onContact}
                  >
                    Contact Customer
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" onClick={onAction}>
                    {actionButtonText}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default ProviderUpcomingServiceCard;
