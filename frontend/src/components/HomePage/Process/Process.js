import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import classes from "./Process.module.css";
import ProcessCard from "./ProcessCard/ProcessCard";
import { useTheme } from "@material-ui/core/styles";
import ProcessTop from "../../../assets/images/process_top.svg";

const processList = [
  {
    title: "Choose Your Services",
    content: `
LoveTeam is here for weekly blowouts, a fun night out, or just because!
  
Browsing and select your desired services from our service menu.
`,
  },
  {
    title: "Tell us When & Where",
    content: `
Kick back in your bathrobe and let us do the work to match you with one of our expert Beauty Professionals.
  
Choose a preferred date, time and location, and let our team come to you               
                      - anytime, anywhere.
`,
  },
  {
    title: "Book and Relax",
    content: `
Confirm your appointment details and payments will handled online - No need for cash on hand.
  
That’s it! Sit back and relax, LoveTeam professionals will be there shortly.
`,
  },
];

function Process(props) {
  const theme = useTheme();
  return (
    <div>
      <SectionTitle title={"Our Process"} />
      <div className={classes.container}>
        {processList.map((item, index) => (
          <ProcessCard
            item={item}
            key={index}
            bgColor={
              index % 2 === 0
                ? theme.palette.primary.main
                : theme.palette.secondary.main
            }
          />
        ))}
        <img className={classes.top} src={ProcessTop} alt="top" />
      </div>
    </div>
  );
}

export default Process;
