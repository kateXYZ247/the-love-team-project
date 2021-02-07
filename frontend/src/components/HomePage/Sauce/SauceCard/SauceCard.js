import React from "react";
import { Grid, Box } from "@material-ui/core";

function SauceCard(props) {
  const { image, title, content } = props.item;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Box align="center">
          <img src={image} alt={title} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          align="center"
          color="#2B292D"
          fontFamily="Helvetica Neue"
          fontSize="24px"
          fontWeight="bold"
          letterSpacing="0"
          lineHeight="30px"
          textAlign="center"
          margin="20px auto"
        >
          {title}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          align="center"
          width="350px"
          color="#2B292D"
          fontFamily="Helvetica Neue"
          font-size="16px"
          letter-spacing="0"
          line-height="24px"
          text-align="center"
          margin="20px auto"
        >
          {content}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SauceCard;
