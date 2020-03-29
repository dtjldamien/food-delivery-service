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
            foodData: []
        }
    }
    componentDidMount() {
        const foodParam = {}
        axios.get('/api/get/getRestaurantsByCategory', {params: foodParam})
        .then(data => data.data.map(foodItems => foodItems))
        .then(foodItems=>this.setState({foodData:foodItems}))
    }
    render() {
        return (
            <div>
                HI
            </div>
        )
    }
}
export default FoodItems