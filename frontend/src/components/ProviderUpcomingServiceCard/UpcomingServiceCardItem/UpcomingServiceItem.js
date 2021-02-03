import React from "react";
import { Grid, Typography } from "@material-ui/core";

function UpcomingServiceItem(props) {
  const { label, value, fontSize, textColor } = props;
  return (
    <Grid container justify="space-between">
      <Grid item xs={3}>
        <Typography variant={fontSize} color={textColor}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant={fontSize} color={textColor}>
          : {value}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default UpcomingServiceItem;
