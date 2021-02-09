import React from "react";
import { Grid, Box } from "@material-ui/core";
import sauce_famous from "../../../../assets/images/sauce_famous.svg";

function SauceCardThree(props) {
  return (
    <Grid container justify="center">
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12}>
          <Box align="center">
            <img src={sauce_famous} />
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
            Work only with experts
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
            Every beauty professional is put through rigorous testing before
            being accepted into our network
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SauceCardThree;
