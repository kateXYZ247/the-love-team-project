import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Grid, Box, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";

import SauceCardOne from "./SauceCard/SauceCardOne";
import SauceCardTwo from "./SauceCard/SauceCardTwo";
import SauceCardThree from "./SauceCard/SauceCardThree";

function Sauce(props) {
  return (
    <Grid container justify="center">
      <Grid item xs={12} align="center">
        <Box marginTop="30px" marginBottom="40px">
          <SectionTitle
            title={"Our Secret Sauce"}
            subtitle={
              "Typically, a customer starts with one recruiter as a test and ramps up as we prove success"
            }
          />
        </Box>
      </Grid>

      <Grid container justify="space-around">
        <Grid item xs={12} sm={3} align="center">
          <Box>
            <SauceCardOne />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} align="center">
          <Box>
            <SauceCardTwo />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} align="center">
          <Box>
            <SauceCardThree />
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} align="center">
        <Box height="80px" marginTop="50px">
          <Fab
            component={Link}
            to={"/order"}
            variant="extended"
            color="secondary"
            size="large"
          >
            Get Started
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Sauce;
