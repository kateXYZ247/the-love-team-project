import React from "react";
import Book from "../../components/HomePage/Book/Book";
import Sauce from "../../components/HomePage/Sauce/Sauce";
import Process from "../../components/HomePage/Process/Process";
import Products from "../../components/HomePage/Products/Products";
import Box from "@material-ui/core/Box";
import { Hidden } from "@material-ui/core";

function Home(props) {
  return (
    <Box mx={5}>
      <Book />
      <Sauce />
      <Hidden mdDown>
        <Process />
      </Hidden>
      <Products />
    </Box>
  );
}

export default Home;
