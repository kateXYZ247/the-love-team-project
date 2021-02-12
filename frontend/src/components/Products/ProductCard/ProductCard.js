import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { CardHeader } from "@material-ui/core";
import PriceDuration from "../PriceDuration/PriceDuration";

const useStyles = makeStyles((theme) => ({
  productCard: {
    marginBottom: 20,
  },
  card: {
    width: 333,
    height: 185,
  },
  cardHeader: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardContent: {
    paddingTop: 0,
  },
  right: {
    height: 140,
  },
  starBar: {
    width: 333,
    height: 8,
    zIndex: "tooltip",
  },
  productDescription: {
    fontFamily: ["Helvetica Neue Regular", "sans-serif"].join(","),
    fontSize: 16,
  },
}));

function ProductCard(props) {
  const classes = useStyles();
  const { withBar, product, productDetailOpen, onSetProduct } = props;

  return (
    <Box className={classes.productCard}>
      <Box>
        {withBar ? (
          <Box className={classes.starBar} bgcolor="primary.main" />
        ) : null}
      </Box>

      <Card
        className={classes.card}
        onClick={() => {
          onSetProduct(product);
          productDetailOpen();
        }}
      >
        <CardHeader
          avatar={product.star ? <FavoriteOutlinedIcon /> : null}
          title={product.productName}
          titleTypographyProps={{ variant: "h5" }}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Grid container direction="row" justify="space-around" spacing={1}>
            <Grid item xs={8}>
              <Typography className={classes.productDescription}>
                {product.productDescription}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <PriceDuration
                price={product.productPrice}
                duration={product.duration}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductCard;
