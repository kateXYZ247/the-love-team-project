import React from "react";
import BottomDivider from "../../UI/BottomDivider/BottomDivider";
import { Badge, Box, Button, Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function BottomAction(props) {
  const { numServices, editCartHandler, buttonText } = props;

  return (
    <Box>
      <BottomDivider />
      <Grid container justify="space-around">
        <Box>
          <Button
            startIcon={
              <Badge badgeContent={numServices} color="primary">
                <ShoppingCartIcon />
              </Badge>
            }
          >
            Edit Cart
          </Button>
        </Box>
        <Box>
          <Button
            onClick={editCartHandler}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            {buttonText}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default BottomAction;
