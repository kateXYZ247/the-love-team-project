import React from "react";
import Book from "../../components/HomePage/Book/Book";
import Sauce from "../../components/HomePage/Sauce/Sauce";
import Process from "../../components/HomePage/Process/Process";

function Home(props) {
  return (
    <div>
      <Book />
      <Sauce />
      <Process />
    </div>
  );
}

export default Home;
