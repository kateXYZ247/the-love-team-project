import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, withStyles } from "@material-ui/core";

const TitleTypography = withStyles({
  root: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    minHeight: "50px",
  },
})(Typography);

const ContentTypography = withStyles({
  root: {
    minHeight: "100px",
  },
})(Typography);

function SauceCard(props) {
  const { image, title, content } = props.item;
  return (
    <Grid item xs={8} lg={4} container justify="center">
      <Grid item xs={12} container justify="center">
        <img style={{ width: "185px" }} src={image} alt={title} />
      </Grid>
      <Grid item xs={12}>
        <TitleTypography variant="h5">{title}</TitleTypography>
      </Grid>
      <Grid item xs={12}>
        <ContentTypography variant={"body1"}>{content}</ContentTypography>
      </Grid>
    </Grid>
  );
}

export default SauceCard;
