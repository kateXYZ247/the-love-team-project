import React from "react";
import Book from "../../components/HomePage/Book/Book";
import Sauce from "../../components/HomePage/Sauce/Sauce";
import Process from "../../components/HomePage/Process/Process";
import Products from "../../components/HomePage/Products/Products";
import Box from "@material-ui/core/Box";

function Home(props) {
  // TODO: change to responsive design, optimize for mobile device
  return (
    <Box p={5}>
      <Book />
      <Sauce />
      <Process />
      <Products />
    </Box>
  );
}

export default Home;
