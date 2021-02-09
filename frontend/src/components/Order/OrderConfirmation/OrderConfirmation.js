import React, { useEffect } from "react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import HairDryer from "../../../assets/images/hair-dryer.svg";
import Spa from "../../../assets/images/spa.svg";
import { Link } from "react-router-dom";
import { PATH_APPOINTMENTS } from "../../../constant/path";

function OrderConfirmation(props) {
  const { orderTime, onUnmount } = props;

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, [onUnmount]);

  return (
    <Box>
      <Typography variant="h3" align="center">
        WooHoo!
      </Typography>
      <Box mt={1}>
        <Typography variant="h5" align="center" color="primary">
          You're all booked for
        </Typography>
        <Typography variant="h5" align="center" color="primary">
          {orderTime.toDateString() + ", " + orderTime.toLocaleTimeString()}
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="h6" align="center">
          We’ll send you a confirmation email shortly
        </Typography>
      </Box>
      <Box my={8} align="center">
        <WbIncandescentOutlinedIcon fontSize="large" />
        <Typography variant="h6" align="center">
          Here are some tips to get ready for your appointment.
        </Typography>
      </Box>
      <Grid container justify="center">
        <Grid item xs={10} lg={4}>
          <Box m={1}>
            <Paper style={{ height: "250px", justifyContent: "center" }}>
              <Box p={1}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={4} align="center">
                    <img src={HairDryer} alt={"hair-dryer"} />
                  </Grid>
                  <Grid item xs={8}>
                    <Box mt={3} fontWeight="fontWeightBold" fontSize={20}>
                      Getting a blow out? Have your hair wet when we arrive
                    </Box>
                    <Box my={3} fontSize={16}>
                      Shampoo your hair shortly before arrival so it’s a damp
                      for your stylist to start the blowout
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={10} lg={4}>
          <Box m={1}>
            <Paper style={{ height: "250px", justifyContent: "center" }}>
              <Box p={1}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={4} align="center">
                    <img src={Spa} alt={"spa"} />
                  </Grid>
                  <Grid item xs={8}>
                    <Box mt={3} fontWeight="fontWeightBold" fontSize={20}>
                      Upload photos of your desired look ready
                    </Box>
                    <Box my={3} fontSize={16}>
                      Manage your appointment at client page
                    </Box>
                    <Grid container justify="center">
                      <Button
                        component={Link}
                        to={PATH_APPOINTMENTS}
                        variant="contained"
                        size="large"
                        color="primary"
                      >
                        Client Page
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderConfirmation;
