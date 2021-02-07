import { Grid, Box } from "@material-ui/core";

import React from "react";
import ProcessImage from "../../../assets/images/ProcessImage.svg";

function Process(props) {
  return (
    <Grid container justify="center">
      <Box>
        <img src={ProcessImage} alt="ProcessImage" />
      </Box>
    </Grid>
  );
}

export default Process;
