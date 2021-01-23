import React from "react";
import Book from "../../components/HomePage/Book/Book";
import Sauce from "../../components/HomePage/Sauce/Sauce";
import Process from "../../components/HomePage/Process/Process";
import Products from "../../components/HomePage/Products/Products";

function Home(props) {
  return (
    <div>
      <Book />
      <Sauce />
      <Process />
      <Products />
    </div>
  );
}

export default Home;
