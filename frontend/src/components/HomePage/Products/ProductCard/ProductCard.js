import React from "react";
import { Link } from "react-router-dom";
import { PATH_ORDER } from "../../../../constant/path";
import ColorButton from "../../../UI/Buttons/ColorButton";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const TitleTypography = withStyles({
  root: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    minHeight: "50px",
  },
})(Typography);

const ContentTypography = withStyles({
  root: {
    minHeight: "100px",
  },
})(Typography);

function ProductCard(props) {
  const { name, description, price } = props.item;
  return (
    <Grid item xs={12} sm={10} md={7} lg={4} container justify="center">
      <Paper elevation={5}>
        <Box p={3}>
          <TitleTypography variant="h5">{name}</TitleTypography>
          <ContentTypography variant="h6">{description}</ContentTypography>
          <Box align="center">
            <ColorButton
              color="primary"
              component={Link}
              to={PATH_ORDER}
              size="large"
              variant="contained"
            >
              Starting at ${price.toFixed(0)}
            </ColorButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ProductCard;
