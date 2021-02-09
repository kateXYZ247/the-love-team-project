import React from "react";
import Book from "../../components/HomePage/Book/Book";
import Sauce from "../../components/HomePage/Sauce/Sauce";
import Process from "../../components/HomePage/Process/Process";
import Products from "../../components/HomePage/Products/Products";
import Title from "../../components/HomePage/Title/Title";
import PhotoContact from "../../components/HomePage/PhotoContact/PhotoContact";

import { Grid } from "@material-ui/core";

function Home(props) {
  // TODO: change to responsive design, optimize for mobile device

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Title />

        <Book />

        <Sauce />

        <Process />

        <Products />

        <PhotoContact />
      </Grid>
    </React.Fragment>
  );
}

export default Home;
