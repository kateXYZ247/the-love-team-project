import React from "react";
import ServiceIllustration from "../../../assets/images/service_illustration.svg";
import { Link } from "react-router-dom";
import { PATH_ORDER } from "../../../constant/path";
import ColorButton from "../../UI/Buttons/ColorButton";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#1B429A",
    fontFamily: "serif",
    fontSize: "64px",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#FFA05A",
    fontFamily: ".SF NS Display, sans-serif",
    fontSize: "18px",
  },
}));

function Book(props) {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={5}>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
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
            <Typography className={classes.title}>
              Beauty, Anywhere, Anytime!
            </Typography>
          </Grid>
          <Grid item xs={12} container justify="flex-start">
            <Box my={5}>
              <Typography className={classes.subtitle}>
                Need to look fabulous, fast? Search. Book. Enjoy. Instantly book
                your next beauty or wellness experience.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} container justify="flex-start">
            <ColorButton
              component={Link}
              to={PATH_ORDER}
              variant="contained"
              color="primary"
              size="large"
            >
              Book Now
            </ColorButton>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} lg={7} container justify="center">
        <img
          style={{ width: "80%" }}
          src={ServiceIllustration}
          alt="Service Illustration"
        />
      </Grid>
    </Grid>
  );
}

export default Book;
