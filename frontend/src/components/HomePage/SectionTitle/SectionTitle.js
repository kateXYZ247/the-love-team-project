import React from "react";
import { Grid, Box } from "@material-ui/core";

function SectionTitle(props) {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Box
          color="#2B292D"
          fontFamily="Helvetica Neue, sans-serif"
          fontSize={32}
          lineHeight="56px"
          text-align="center"
          margin="10px auto"
          fontWeight="fontWeightBold"
          letterSpacing="-0.29px"
        >
          {props.title}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          color="#2B292D"
          fontFamily="Helvetica Neue, sans-serif"
          fontSize={16}
          letterSpacing="0"
          lineHeight="34px"
          text-align="center"
          margin="10px auto"
        >
          {props.subtitle ? <div>{props.subtitle}</div> : null}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SectionTitle;
