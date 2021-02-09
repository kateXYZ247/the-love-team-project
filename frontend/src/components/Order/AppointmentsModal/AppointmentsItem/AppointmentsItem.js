import React from "react";
import { Box, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function AppointmentsItem(props) {
  const { label, onDelete } = props;

  return (
    <Box>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={5}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}

export default AppointmentsItem;
