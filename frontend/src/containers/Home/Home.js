import React from "react";
import Book from "../../components/HomePage/Book/Book";
import Sauce from "../../components/HomePage/Sauce/Sauce";
import Process from "../../components/HomePage/Process/Process";
import Products from "../../components/HomePage/Products/Products";
import classes from "./Home.module.css";

function Home(props) {
  return (
    <div className={classes.container}>
      <Book />
      <Sauce />
      <Process />
      <Products />
    </div>
  );
}

export default Home;
