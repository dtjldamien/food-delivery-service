import React from "react"
import axios from 'axios'
import datatable, { DataTable, Column } from 'primereact/datatable'
import { Link } from 'react-router-dom'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
class Restaurants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryName: "All",
            restaurantData: [
                {rname: 'res1', category: 'western', rid: '1'},
                {rname: 'res2', category: 'japanese', rid: '2'}
            ]
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({categoryName: this.props.match.params.catname})
        const restaurantParam = {
            catname: this.props.match.params.catname
        }
        let resData = []
        axios.get('/api/get/getRestaurantsByCategory', {params: restaurantParam})
        .then(data => data.data.map(restaurant => restaurant))
        .then(restaurant=>this.setState({restaurantData:restaurant}))
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.categoryName}</h1>
                <DataTable value = {this.state.restaurantData}>
                    <Column field="rid" header = "rid"/>
                    <Column field="rname" header="rname"/>
                    <Column field="address" header="address"/>
                    <Column field="minimumspending" header="minimumspending"/>
                </DataTable>
            </div>
        )
    }
}
export default Restaurants 