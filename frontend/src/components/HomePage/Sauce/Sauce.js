import React from "react";
import classes from "./Sauce.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import SaucePlace from "../../../assets/images/sauce_place.svg";
import SauceReputation from "../../../assets/images/sauce_reputation.svg";
import SauceFamouse from "../../../assets/images/sauce_famous.svg";
import SauceCard from "./SauceCard/SauceCard";

const sauceList = [
  {
    image: SaucePlace,
    title: "LoveTeam Comes to you",
    content:
      "Whether in your home, office, or hotel; Sit back and relax as we bring the best service straight to your door.",
  },
  {
    image: SauceReputation,
    title: "Simple Booking",
    content:
      "On - demand, on - location beauty services that match your request with our expert beauty professional in your area in as little as an hour’s notice or up to 3 months in advance.",
  },
  {
    image: SauceReputation,
    title: "Work only with experts",
    content:
      "Every beauty professional is put through rigorous testing before being accepted into our network.",
  },
];

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
          <SauceCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Sauce;
