import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ProductCard(props) {
  const classes = useStyles();
  const { category, name, content, price, duration } = props.item;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardActions>
        <Button size="small">
          <CardContent>
            <Typography variant="h5" component="h2">
              <FavoriteOutlinedIcon /> {name}
            </Typography>
            <Typography variant="body2" component="p">
              {content}
            </Typography>
            <Typography variant="body2" component="p">
              ${price.toFixed(0)}
            </Typography>
            <Typography variant="body2" component="p">
              <AccessAlarmIcon /> {duration} mins
            </Typography>
          </CardContent>
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;


