import React from "react";
import { Grid, Box } from "@material-ui/core";
import sauce_place from "../../../../assets/images/sauce_place.svg";

function SauceCardOne(props) {
  // const {image, title, content} = props.item;
  return (
    <Grid container justify="center">
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12}>
          <Box align="center">
            <img src={sauce_place} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            align="center"
            color="#2B292D"
            fontFamily="'Helvetica Neue', sans-serif"
            fontSize="24px"
            fontWeight="bold"
            letterSpacing="0"
            lineHeight="30px"
            textAlign="center"
            margin="20px auto"
          >
            LoveTeam Comes to you
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            align="center"
            width="350px"
            color="#2B292D"
            fontFamily="'Helvetica Neue', sans-serif"
            fontSize="16px"
            letterSpacing="0"
            lineHeight="24px"
            text-align="center"
            margin="20px auto"
          >
            Whether in your home, office, or hotel; Sit back and relax as we
            bring the best service straight to your door.
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SauceCardOne;
