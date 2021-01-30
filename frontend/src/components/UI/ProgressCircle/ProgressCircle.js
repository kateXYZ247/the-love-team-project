import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";

function ProgressCircle(props) {
  const { label } = props;
  return (
    <Box align="center">
      <Box m={2}>
        <Typography variant="h5">{label}</Typography>
      </Box>
      <CircularProgress size={80} />{" "}
    </Box>
  );
}

export default ProgressCircle;
