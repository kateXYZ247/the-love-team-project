import React from "react";
import { Box, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // Theme Color, or use css color in quote
    background: theme.palette.primary.main,
    height: 3,
  },
}));

function BottomDivider(props) {
  const classes = useStyles();

  return (
    <Box m={2}>
      <Divider light variant="middle" className={classes.root} />
    </Box>
  );
}

export default BottomDivider;
