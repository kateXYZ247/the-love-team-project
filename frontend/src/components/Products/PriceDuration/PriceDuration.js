import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { useTheme } from "@material-ui/core/styles";

function PriceDuration(props) {
  const { price, duration } = props;
  const theme = useTheme();
  return (
    <Box align="center">
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        ${price.toFixed(0)}
      </Typography>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={3}>
          <AccessAlarmIcon color="primary" />
        </Grid>
        <Grid item xs={9}>
          <Typography
            variant="body1"
            style={{ color: theme.palette.primary.main }}
          >{`${duration} mins`}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PriceDuration;
