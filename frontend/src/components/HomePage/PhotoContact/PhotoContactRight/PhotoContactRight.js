import React from "react";
import { Box, Card, Grid } from "@material-ui/core";
import ContactForm from "../ContactForm";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 200,
    backgroundColor: `${theme.palette.primary.main}`,
    paddingTop: 100,
  },

  sentence: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 18,
    fontWeight: 400,
    color: "#3C3C3C",
    letterSpacing: 0,
  },
}));

function PhotoContactRight(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      classes={classes.root}
      backgroundColor="primary"
    >
      <Card>
        <Grid item xs={12}>
          <Box
            align="center"
            width="501px"
            color="#381F05"
            fontFamily="Helvetica Neue, sans-serif"
            fontSize={40}
            fontWeight="fontWeightBold"
            letterSpacing="0"
            line-height="56px"
            text-align="center"
            margin="20px auto"
            marginTop="100px"
          >
            Work with the top beauty professionals in your city
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box marginTop="40px">
            <p className={classes.sentence}> Full Background Check </p>
            <p className={classes.sentence}> 8+ years Experience </p>
            <p className={classes.sentence}>
              Certified in COVID-19 Safety Products
            </p>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box align="left" marginTop="70px">
            <ContactForm />
          </Box>
        </Grid>
      </Card>
    </Grid>
  );
}

export default PhotoContactRight;
