import React from "react";
import classes from "./Book.module.css";
import ServiceIllustration from "../../../assets/images/service_illustration.svg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PATH_ORDER } from "../../../constant/path";

function Book(props) {
  return (
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
  );
}

export default Book;
