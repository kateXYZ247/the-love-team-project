import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    color: '#2B292D',
    h2: {
      fontFamily: [
        'Helvetica Neue Bold', 
        'sans-serif',].join(','),
      fontWeight: 600,
      fontSize: 18,
    },
    body1: {
      fontFamily: [
        'Helvetica Neue Regular', 
        'sans-serif',].join(','),
      fontSize: 16,
    },
    h1: {
      fontFamily: [
        'Helvetica Neue Bold', 
        'sans-serif',].join(','),
      fontWeight: 600,
      fontSize: 24,
    },
    body2: {
      fontFamily: [
        'Helvetica Neue Regular', 
        'sans-serif',].join(','),
      fontSize: 16,
      color: '#B57AD2',
    }
  },
});

const useStyles = makeStyles((theme) => ({
  card: {
    width: 333,
    height: 150,
    margin: 20,
  },
  cardActionArea: {
    width: 333,
    height: 150,
  },
  paper: {
    backgroundColor: '#B57AD2', 
    width: 333,
    height: 5,
  }
}));

function ProductCard(props) {
  const classes = useStyles();
  const { productId, productName, productDescription, productPrice, duration } = props.item;
  
  return (
    <Card className={classes.card}>
      <Paper className={classes.paper}/>
      <CardActionArea className={classes.cardActionArea}>
        <CardContent>
          <ThemeProvider theme={theme}>
            <Grid container spacing={1} direction="column" >
              <Grid item>
                <Typography variant="h2" >
                  <FavoriteOutlinedIcon /> {productName}
                </Typography>
              </Grid>
              <Grid container direction="row" justify="flex-start" alignItems="center">   
                <Grid item xs={8}>
                  <Typography variant="body1" >
                    {productDescription}
                  </Typography>
                </Grid>
                <Grid xs={4} container direction="column" justify="space-evenly" alignItems="flex-end">   
                  <Grid item>
                    <Typography variant="h1" >
                      ${productPrice.toFixed(0)}
                    </Typography>
                  </Grid> 
                  <Grid item>
                    <Typography variant="body2" >
                      <AccessAlarmIcon /> {duration} mins
                    </Typography>
                  </Grid> 
                </Grid> 
              </Grid>  
            </Grid> 
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;


