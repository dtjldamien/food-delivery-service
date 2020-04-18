import React from 'react';
import { Link } from "react-router-dom";

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
        <Link to={{pathname:'/createRestaurantPromotions'}}>
          <a>Create New Restauarnt Promotion</a>
        </Link>
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
