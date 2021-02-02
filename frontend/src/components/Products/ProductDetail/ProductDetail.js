import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import CardMedia from '@material-ui/core/CardMedia';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  productDetail: {
    minHeight: '43vh',
  },
  grid: {
    marginTop: 40,
  },
  button: {
    borderRadius: "25em"
  },
  productPrice: {
    fontFamily: ["Helvetica Neue Bold", "sans-serif"].join(","),
    fontSize: 18,
    fontWeight: 900,
  },
  productName: {
    fontFamily: ["Helvetica Neue Bold", "sans-serif"].join(","),
    fontWeight: 600,
    fontSize: 24,
  },
  productDescription: {
    fontFamily: ["Helvetica Neue Regular", "sans-serif"].join(","),
    fontSize: 16,
  },
  clients: {
    fontFamily: ["Helvetica Neue Bold", "sans-serif"].join(","),
    fontSize: 18,
    fontWeight: 900,
  },
  duration: {
    fontFamily: ["Helvetica Neue Regular", "sans-serif"].join(","),
    fontSize: 18,
    color: "#B57AD2",
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

  if (product === '') {
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
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.grid}
            spacing={4}
          >
            <Grid item >
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography className={classes.productName}>
                        {product.productName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.productPrice}>
                        ${product.productPrice.toFixed(0)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.duration} >
                        <div> <AccessAlarmIcon />  {product.duration} mins</div>
                      </Typography>
                    </Grid>
                    <Grid item >
                      <Typography className={classes.productDescription}>{product.productDescription}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <CardMedia
                    component="img"
                    alt={product.productName}
                    image={product.imageURL}
                    title={product.productName}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
              >
                <Grid item xs={9}>
                  <Typography className={classes.clients}>
                    How many clients?
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <ButtonGroup size="small" aria-label="small outlined button group">
                    {<Button color="primary" onClick={clientCounterDecrement}>-</Button>}
                    {<Button color="primary"
                      onClick={() => {
                        setClientCounter(1);
                      }}
                    >{clientsCounter}</Button>}
                    <Button color="primary" onClick={clientCounterIncrement}>+</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid item >
              <Button onClick={() => {
                var i = 0;
                for (; i < clientsCounter;) {
                  addProductToCart(product)
                  i++;
                };
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
        </DialogContent>
      </Dialog >
    );
  }
}

export default ProductDetail;
