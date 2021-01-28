import React from "react";
import BottomDivider from "../../UI/BottomDivider/BottomDivider";
import { Badge, Box, Button, Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function BottomAction(props) {
  const { numServices, onEditCart, buttonText, onClickNext } = props;

  return (
    <Box>
      <BottomDivider />
      <Grid container justify="space-around">
        <Box>
          <Button
            size="large"
            onClick={onEditCart}
            startIcon={
              <Badge
                badgeContent={numServices}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            }
          >
            My Appointments
          </Button>
        </Box>
        <Box>
          <Button
            size="large"
            onClick={onClickNext}
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
