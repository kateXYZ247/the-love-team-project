import React from "react";
import classes from "./Sauce.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import SauceCard from "./SauceCard/SauceCard";
import { Button } from "@material-ui/core";
import { sauceList } from "../../../constant/homepage";
import { Link } from "react-router-dom";

function Sauce(props) {
  return (
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
          to={"/order"}
          variant="contained"
          color="primary"
          size="large"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Sauce;
