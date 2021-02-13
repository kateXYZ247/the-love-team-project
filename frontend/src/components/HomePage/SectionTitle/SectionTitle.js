import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core";

const TitleTypography = withStyles({
  root: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    minHeight: "50px",
  },
})(Typography);

function SectionTitle(props) {
  return (
    <Grid item xs={12} container justify="center">
      <Grid item container justify="center">
        <Box mt={6} mb={2}>
          <TitleTypography variant="h4">{props.title}</TitleTypography>
        </Box>
      </Grid>
      {props.subtitle ? (
        <Grid item container justify="center">
          <Typography variant="body1">{props.subtitle}</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default SectionTitle;
