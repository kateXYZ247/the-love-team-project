import React from "react";
import { Grid, Typography } from "@material-ui/core";

function TextGrid(props) {
  const { text, xs, lg, fontSize, textColor } = props;
  return (
    <Grid item xs={xs} lg={lg}>
      <Typography variant={fontSize} color={textColor}>
        {text}
      </Typography>
    </Grid>
  );
}

export default TextGrid;
