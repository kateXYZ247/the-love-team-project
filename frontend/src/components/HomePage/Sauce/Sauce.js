import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import SauceCard from "./SauceCard/SauceCard";
import { sauceList } from "../../../constant/homepage";
import { Link } from "react-router-dom";
import { PATH_ORDER } from "../../../constant/path";
import ColorButton from "../../UI/Buttons/ColorButton";
import Grid from "@material-ui/core/Grid";

function Sauce(props) {
  return (
    <Grid container justify="center" spacing={5}>
      <SectionTitle
        title={"Our Secret Sauce"}
        subtitle={
          "Typically, a customer starts with one recruiter as a test and ramps up as we prove success"
        }
      />
      {sauceList.map((item) => (
        <SauceCard item={item} key={item.title} />
      ))}
      <Grid item xs={12} container justify="center">
        <ColorButton
          component={Link}
          to={PATH_ORDER}
          variant="contained"
          color="primary"
          size="large"
        >
          Get Started
        </ColorButton>
      </Grid>
    </Grid>
  );
}

export default Sauce;
