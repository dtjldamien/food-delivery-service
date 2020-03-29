import React from "react"
import axios from 'axios'
import datatable, { DataTable, Column } from 'primereact/datatable'
import { Link, Redirect } from 'react-router-dom'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
class FoodItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantData: [],
            foodData: []
        }
    }
    componentDidMount() {
        const restaurant = this.props.location.state.selectedRestaurant
        this.setState({restaurantData: restaurant})
        const restaurantID = {
            rid: restaurant.rid
        }
        // console.log(this.state)
        console.log(this.props)
        console.log(this.state)
        axios.get('/api/get/getFoodItemsByRestaurantID', {params: restaurantID})
        .then(data => data.data.map(foodItems => foodItems))
        .then(foodItems=>this.setState({foodData:foodItems}))
    }
    render() {
        return (
            <div>
                 <DataTable value = {this.state.foodData}>
                    <Column field="fid" header = "fid"/>
                    <Column field="fname" header="fname" sortable={true}/>
                    <Column field="description" header= "description" sortable={true}/>
                    <Column field="price" header="price" sortable={true}/>
                </DataTable>
            </div>
        )
    }
}
export default FoodItems