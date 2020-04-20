import React from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { DataTable, Column } from 'primereact/datatable'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rid: props.restaurantStaff.rid,
      email: props.restaurantStaff.email,
      password: props.restaurantStaff.password,
      name: props.restaurantStaff.name,
      visible: false,
      promotions: [],
      promotionData: []
    }
    this.viewPromotions = this.viewPromotions.bind(this)
    this.viewPromotionsDialog = this.viewPromotionsDialog.bind(this)
    this.updatePromotion = this.updatePromotion.bind(this)
  }

  componentDidMount() {
    const email = {
      email: this.state.email
    }
    console.log(this.props)
    console.log(this.state)
    axios.get('/api/get/viewRestaurantPromotionsByStaff', { params: email })
      .then(data => data.data.map(promotions => promotions))
      .then(promotions => this.setState({ promotionData: promotions }))
  }

  render() {
    return (
      <div>
        <Link to={{ pathname: '/createRestaurantPromotion' }}>
          <a>Create New Restaurant Promotion</a>
        </Link>
        <br></br>
        <DataTable value={this.state.promotionData}>
          <Column field="rpid" header="rpid" sortable={true} />
          <Column field="email" header="Restaurant Staff Email" sortable={true} />
          <Column field="startDate" header="Promotion Start Date" sortable={true} />
          <Column field="endDate" header="Promotion End Date" sortable={true} />
          <Column field="currentCount" header="Use Count" sortable={true} />
          <Column field="promotionLimit" header="Promotion Limit" sortable={true} />
          <Column field="rpid" header="Action" body={this.updatePromotion} />
        </DataTable>
        {this.viewPromotionsDialog()}
      </div>
    );
  }

  viewPromotions() {
    return this.state.promotions.length > 0 ?

      /* Renders data table if the promotion list is not empty */
      (
        <div>
          <DataTable value={this.state.promotions}>
            <Column field="rpid" header="rpid" sortable={true} />
            <Column field="email" header="Restaurant Staff Email" sortable={true} />
            <Column field="startDate" header="Promotion Start Date" sortable={true} />
            <Column field="endDate" header="Promotion End Date" sortable={true} />
            <Column field="currentCount" header="Use Count" sortable={true} />
            <Column field="promotionLimit" header="Promotion Limit" sortable={true} />
            <Button label="Update" onClick={this.updatePromotion}></Button>
          </DataTable>
        </div>
      )

      :

      (
        <div>
          <h4>Empty Cart!</h4>
        </div>
      )
  }

  viewPromotionsDialog() {
    return (
      <div>
        <Dialog header="View Promotions" visible={this.state.visible} onHide={() => this.setState({ visible: false })}>
          {this.viewPromotions()}
        </Dialog>
        <Button label="View Promotions" onClick={() => this.setState({ visible: true })}></Button>
      </div>
    )
  }

  updatePromotion() {

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
