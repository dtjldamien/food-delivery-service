import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Promotions() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Promotions</Title>
      <Typography component="p" variant="h4">
        $1.50 off COVID-19 Bundle!
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 1 February, 2020
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All Promotions
        </Link>
      </div>
    </React.Fragment>
  );
}
