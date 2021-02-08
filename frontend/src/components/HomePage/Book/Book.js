import React from "react";

import ServiceIllustration from "../../../assets/images/service_illustration.svg";
import { Box, Grid, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PATH_ORDER } from "../../../constant/path";

function Book(props) {
  return (
<<<<<<< HEAD
    <Grid container justify="space-around">
      <Grid item xs={12} sm={6} align="center">
        <Box>
          <Box
            align="center"
            height="240px"
            fontWeight="fontWeightBold"
            color="#1B429A"
            fontSize={64}
            font="Bodoni 72 Oldstyle Bold"
            marginTop="200px"
            marginBottom="20px"
            // fontWeight="bold"
            letterSpacing="0"
            lineHeight="80px"
          >
            Beauty, Anywhere, Anytime!
          </Box>
          <Box
            align="center"
            height="72px"
            width="600px"
            fontWeight="fontWeightBold"
            color="#FFA05A"
            fontSize={20}
            marginTop="20px"
            marginBottom="100px"
            fontWeight="bold"
            letterSpacing="0"
            lineHeight="36px"
            textAlign="left"
          >
            Need to look fabulous, fast? Search. Book. Enjoy. Instantly book
            your next beauty or wellness experience.
          </Box>
          <Fab
            component={Link}
            to={"/order"}
            variant="extended"
            color="secondary"
            size="large"
            aria-label="add"
          >
            Book Now
          </Fab>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} align="center">
        <Box>
          <img src={ServiceIllustration} alt="Service Illustration" />
        </Box>
      </Grid>
    </Grid>
=======
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.title}>Beauty, Anywhere, Anytime!</div>
        <div className={classes.subtitle}>
          Need to look fabulous, fast? Search. Book. Enjoy. Instantly book your
          next beauty or wellness experience.
        </div>
        <Button
          component={Link}
          to={PATH_ORDER}
          variant="contained"
          color="primary"
          size="large"
        >
          Book Now
        </Button>
      </div>
      <div className={classes.illustration}>
        <img src={ServiceIllustration} alt="Service Illustration" />
      </div>
    </div>
>>>>>>> develop
  );
}

export default Book;
