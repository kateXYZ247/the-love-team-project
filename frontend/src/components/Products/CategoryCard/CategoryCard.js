import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    border: "none",
    boxShadow: "none",
  },
  container: {
    marginTop: 40,
    marginBottom: 0,
  },
  title: {
    color: "#2B292D",
    fontWeight: 600,
    fontFamily: ["Helvetica Neue", "sans-serif"].join(","),
    fontSize: 24,
  },
}));

function CategoryCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        {props.title ? (
          <div className={classes.title}>{props.title}</div>
        ) : null}
      </Card>
    </div>
  );
}

export default CategoryCard;
