import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import classes from "./Process.module.css";
import ProcessCard from "./ProcessCard/ProcessCard";
import { useTheme } from "@material-ui/core/styles";
import ProcessTop from "../../../assets/images/process_top.svg";
import { processList } from "../../../constant/homepage";

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
