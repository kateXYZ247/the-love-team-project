import React from "react";
import { Box, Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ClearIcon from "@material-ui/icons/Clear";

function TopAction(props) {
  const { onClickBack, onClickCancel } = props;
  return (
    <Box>
      <Grid container justify="space-around">
        <Box>
          <IconButton aria-label="back" onClick={onClickBack}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <IconButton aria-label="cancel" onClick={onClickCancel}>
            <ClearIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
    </Box>
  );
}

export default TopAction;
