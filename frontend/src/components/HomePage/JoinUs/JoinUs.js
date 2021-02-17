import React from "react";
import Providers from "../../../assets/images/providers.svg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Hidden, TextField, withStyles } from "@material-ui/core";

const TitleTypography = withStyles({
  root: {
    fontWeight: "bold",
    textAlign: "center",
  },
})(Typography);

function Book(props) {
  return (
    <Box mt={4}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={12} lg={7} container justify="center">
          <img
            style={{ width: "80%" }}
            src={Providers}
            alt="Service Illustration"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={4}
          container
          justify="center"
          alignItems="center"
        >
          <Box>
            <Grid item xs={12} container justify="flex-start">
              <TitleTypography variant="h4">
                {"Work with the top beauty professionals in your city"}
              </TitleTypography>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Box my={2} mx={5}>
                <Typography>Full Background Check</Typography>
                <Typography>8+ years Experience</Typography>
                <Typography>Certified in COVID-19 Safety Protocols</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} container justify="flex-start">
              <Grid item xs={12}>
                <Typography variant="h5">CONTACT US</Typography>
              </Grid>
              <Grid item xs={12}>
                <form noValidate autoComplete="off">
                  <Box>
                    <Box my={1}>
                      <TextField
                        label="Your Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Box>
                    <Box my={1}>
                      <TextField
                        label="Your Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Box>
                    <Box my={1}>
                      <TextField
                        label="Description"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={5}
                      />
                    </Box>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Hidden mdDown>
          <Grid item lg={1} />
        </Hidden>
      </Grid>
    </Box>
  );
}

export default Book;
