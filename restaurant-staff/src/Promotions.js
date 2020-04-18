import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'primereact/resources/themes/nova-light/theme.css';
import Home from './Home';
import CreateRestaurantPromotion from "./CreateRestaurantPromotion";


class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rid: props.restaurantStaff.rid,
      email: props.restaurantStaff.email,
      password: props.restaurantStaff.password,
      name: props.restaurantStaff.name,
    };
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <ul>
          <a href="/createRestaurantPromotions">Create Restaurant Promotion</a>
        </ul>
      </div>
    );
  }
}

export default Promotions

/*
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
*/
