import React from "react";
import { Box, Card, Fab, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { name, description, price } = props.item;
  return (
    <Grid container justify="center">
      <Card>
        <Grid item xs={12}>
          <Box
            align="center"
            width="250px"
            color="#3C3C3C"
            fontFamily="Helvetica Neue, sans-serif"
            fontSize={24}
            fontWeight="fontWeightBold"
            letterSpacing="-0.29px"
            line-height="56px"
            text-align="center"
            margin="20px auto"
          >
            {name}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            align="center"
            height="50px"
            width="400px"
            color="#3C3C3C"
            font-family="Helvetica Neue, sans-serif"
            fontSize={22}
            letterSpacing="0"
            line-height="27px"
            margin="20px auto"
          >
            {description}
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box height="80px" marginTop="50px">
            <Fab
              component={Link}
              to={"/order"}
              size="large"
              color="secondary"
              variant="contained"
            >
              Starting at ${price.toFixed(0)}
            </Fab>
          </Box>
        </Grid>
      </Card>
    </Grid>
  );
}

export default ProductCard;
