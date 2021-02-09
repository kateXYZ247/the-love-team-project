import React from "react";
import { Grid, Box } from "@material-ui/core";
import sauce_reputation from "../../../../assets/images/sauce_reputation.svg";

function SauceCardTwo(props) {
  return (
    <Grid container justify="center">
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12}>
          <Box align="center">
            <img src={sauce_reputation} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            align="center"
            color="#2B292D"
            fontFamily="'Helvetica Neue', sans-serif"
            fontSize="24px"
            fontWeight="bold"
            letterSpacing="0"
            lineHeight="30px"
            textAlign="center"
            margin="20px auto"
          >
            Simple Booking
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            align="center"
            width="350px"
            color="#2B292D"
            fontFamily="'Helvetica Neue', sans-serif"
            fontSize="16px"
            letterSpacing="0"
            lineHeight="24px"
            text-align="center"
            margin="20px auto"
          >
            On - demand, on - location beauty services that match your request
            with our expert beauty professional in your area in as little as an
            hour’s notice or up to 3 months in advance
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SauceCardTwo;
