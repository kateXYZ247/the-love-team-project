import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import SauceCard from "./SauceCard/SauceCard";
import { Button, Card, CardContent, Grid, Box, Fab } from "@material-ui/core";
import { sauceList } from "../../../constant/homepage";
import { Link } from "react-router-dom";
import { PATH_ORDER } from "../../../constant/path";

function Sauce(props) {
  return (
<<<<<<< HEAD
    <Grid container justify="center">
      <Grid item xs={12} align="center">
        <SectionTitle
          title={"Our Secret Sauce"}
          subtitle={
            "Typically, a customer starts with one recruiter as a test and ramps up as we prove success"
          }
        />
      </Grid>

      <Grid item xs={12} justify="center" spacing={5}>
        <Box
          width="50"
          display="flex"
          align="center"
          marginTop="50px"
          marginBottom="20px"
          margin="50px auto"
=======
    <div>
      <SectionTitle
        title={"Our Secret Sauce"}
        subtitle={
          "Typically, a customer starts with one recruiter as a test and ramps up as we prove success"
        }
      />
      <div className={classes.container}>
        {sauceList.map((item) => (
          <SauceCard item={item} key={item.title} />
        ))}
      </div>
      <div className={classes.button}>
        <Button
          component={Link}
          to={PATH_ORDER}
          variant="contained"
          color="primary"
          size="large"
>>>>>>> develop
        >
          {sauceList.map((item) => (
            <SauceCard item={item} key={item.title} />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} align="center">
        <Box height="80px" marginTop="50px">
          <Fab
            component={Link}
            to={"/order"}
            variant="contained"
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
