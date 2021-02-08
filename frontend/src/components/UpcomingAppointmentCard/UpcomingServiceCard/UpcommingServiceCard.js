import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import UpcomingAppointmentItem from "../UpcomingAppointmentItem/UpcomingAppointmentItem";

function UpcommingServiceCard(props) {
  const { service } = props;
  return (
    <Grid item xs={11} sm={8}>
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={2}>
            <Grid container spacing={0}>
              {service.productName}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default UpcommingServiceCard;