import React from "react";
import { Box, Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ClearIcon from "@material-ui/icons/Clear";

function TopAction(props) {
  return (
    <Box>
      <Grid container justify="space-around">
        <Box>
          <IconButton aria-label="back">
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <IconButton aria-label="cancel">
            <ClearIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
    </Box>
  );
}

export default TopAction;
