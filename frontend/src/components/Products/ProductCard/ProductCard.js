import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

const useStyles = makeStyles(() => ({
  productCard: {
    margin: 20,
  },
  cardActionArea: {
    width: 333,
    height: 155,
    "&:hover $focusHighlight": {
      opacity: 0
    },
  },
  starBar: {
    backgroundColor: "#B57AD2",
    width: 333,
    height: 5,
    zIndex: "tooltip",
  },
  productName: {
    fontFamily: ["Helvetica Neue Bold", "sans-serif"].join(","),
    fontWeight: 600,
    fontSize: 18,
  },
  productDescription: {
    fontFamily: ["Helvetica Neue Regular", "sans-serif"].join(","),
    fontSize: 16,
  },
  productPrice: {
    fontFamily: ["Helvetica Neue Bold", "sans-serif"].join(","),
    fontWeight: 600,
    fontSize: 24,
  },
  duration: {
    fontFamily: ["Helvetica Neue Regular", "sans-serif"].join(","),
    fontSize: 16,
    color: "#B57AD2",
  },
}));

function ProductCard(props) {
  const classes = useStyles();
  const {
<<<<<<< HEAD
    product,
    productDetailOpen,
    onSetProduct,
  } = props;
=======
    productName,
    productDescription,
    productPrice,
    duration,
    star,
  } = props.item;
>>>>>>> develop

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={0}
      className={classes.productCard}
    >
      <Grid item>
        {product.star ? <Paper className={classes.starBar} /> : null}
      </Grid>

      <Grid item>
        <Card >
          <CardActionArea className={classes.cardActionArea}
            onClick={() => {
              onSetProduct(product);
              productDetailOpen();
            }}>

            <CardContent>
              <Grid container spacing={2} direction="column" justify="flex-start">
                <Grid item>
                  <Typography className={classes.productName}>
                    {product.star ? (
                      <div>
                        <FavoriteOutlinedIcon />
                        {product.productName}
                      </div>
                    ) : (
                        product.productName
                      )}
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={8}>
                    <Typography className={classes.productDescription}>{product.productDescription}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid
                      container
                      direction="column"
                      justify="space-evenly"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <Typography className={classes.productPrice}>
                          ${product.productPrice.toFixed(0)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.duration}>
                          <div>
                            <AccessAlarmIcon />  {product.duration} mins</div>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card >
      </Grid>
    </Grid >

  );
}

export default ProductCard;
