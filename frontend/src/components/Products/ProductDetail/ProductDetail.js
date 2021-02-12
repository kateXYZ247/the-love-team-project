import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PriceDuration from "../PriceDuration/PriceDuration";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  productDetail: {
    minHeight: "43vh",
  },
  button: {
    borderRadius: "25em",
  },
}));

function ProductDetail(props) {
  const {
    product,
    open,
    handleClose,
    clientsCounter,
    clientCounterIncrement,
    clientCounterDecrement,
    addProductToCart,
    setClientCounter,
  } = props;

  const classes = useStyles();

  if (product === "") {
    return null;
  } else {
    return (
      <Dialog
        open={open}
        onClose={() => {
          setClientCounter(1);
          handleClose();
        }}
        maxWidth="md"
        keepMounted
        fullWidth={true}
      >
        <DialogContent className={classes.productDetail}>
          <Box p={3}>
            <Grid container alignItems="center" spacing={4} justify="center">
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  spacing={4}
                >
                  <Grid item xs={12} md={5}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Typography variant="h4">
                          {product.productName}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <PriceDuration
                          price={product.productPrice}
                          duration={product.duration}
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.productDescription}>
                          {product.productDescription}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={8} md={7}>
                    <CardMedia
                      component="img"
                      alt={product.productName}
                      image={product.imageURL}
                      title={product.productName}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={7} container justify="center">
                  <Typography variant="h5">How many clients?</Typography>
                </Grid>
                <Grid item xs={12} sm={5} container justify="center">
                  <Box p={2}>
                    <ButtonGroup
                      size="small"
                      aria-label="small outlined button group"
                    >
                      {
                        <Button
                          color="primary"
                          onClick={clientCounterDecrement}
                        >
                          -
                        </Button>
                      }
                      {
                        <Button
                          color="primary"
                          onClick={() => {
                            setClientCounter(1);
                          }}
                        >
                          {clientsCounter}
                        </Button>
                      }
                      <Button color="primary" onClick={clientCounterIncrement}>
                        +
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Button
                  onClick={() => {
                    var i = 0;
                    for (; i < clientsCounter; ) {
                      addProductToCart(product);
                      i++;
                    }
                    setClientCounter(1);
                    handleClose();
                  }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Add Service
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ProductDetail;
