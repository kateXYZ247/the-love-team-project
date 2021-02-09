import React from "react";
import { Box, Card, Fab, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function ProductCardThree(props) {
  // const { name, description, price } = props.item;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Box
          align="center"
          width="250px"
          color="#3C3C3C"
          fontFamily="Helvetica Neue, sans-serif"
          fontSize={24}
          fontWeight="fontWeightBold"
          letterSpacing="-0.29px"
          lineHeight="56px"
          text-align="center"
          margin="20px auto"
        >
          Manicure
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          align="center"
          height="50px"
          width="400px"
          color="#3C3C3C"
          fontFamily="Helvetica Neue, sans-serif"
          fontSize={22}
          letterSpacing="0"
          lineHeight="27px"
          margin="20px auto"
        >
          Choice of our polish or yours with shaping, cuticles, lotion, and
          option for shellac
        </Box>
      </Grid>
      <Grid item xs={12} align="center">
        <Box height="80px" marginTop="50px">
          <Fab
            component={Link}
            to={"/order"}
            size="large"
            color="secondary"
            variant="extended"
          >
            Starting at $40
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProductCardThree;
