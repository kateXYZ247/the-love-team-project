import React from "react";
import ProductsGrid from "./ProductsGrid/ProductsGrid"
import Grid from '@material-ui/core/Grid';
import { Box } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

theme.typography.h3 = {
  color: '#2B292D',
  fontWeight: 600,
  fontFamily: [
    'Helvetica Neue Bold',
    'sans-serif',].join(','),
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

function Products(props) {
  return (
    <React.Fragment>
      <Grid container container direction="column" justify="space-around" alignItems="center">
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <Typography variant="h3">
              Select one or multiple services to start booking
            </Typography>
          </ThemeProvider>
        </Grid>
        <Grid item >
          <ProductsGrid />
        </Grid>
      </Grid>
    </React.Fragment>


  );
}

export default Products;
