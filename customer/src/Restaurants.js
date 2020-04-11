import React from "react"
import axios from 'axios'
import datatable, { DataTable, Column } from 'primereact/datatable'
import { Link, Redirect } from 'react-router-dom'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button'
class Restaurants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryName: "All",
            restaurantData: [],
            redirect: null,
            selectedRestaurant: null
        }
        this.selectRestaurant = this.selectRestaurant.bind(this)
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

    redirectOnClick() {
        if (this.state.redirect !== null) {
            return <Redirect to={{
                pathname: this.state.redirect,
                state: {
                    selectedRestaurant: this.state.selectedRestaurant
                }
            }}/>
        }
    }

    selectRestaurant(rowData, column) {
        return <div>
            <Button label="Select" onClick= {() => this.setState({selectedRestaurant: rowData, redirect: `/restaurants/${rowData.catname}/${rowData.rname}`})}/>
        </div>
    }
    
    render() {
        return (
            <div>
                {this.redirectOnClick()}
                <h1>{this.state.categoryName}</h1>
                <DataTable value = {this.state.restaurantData} onRowClick = {(e) => this.setState({selectedRestaurant: e.data, redirect: `/restaurants/${this.state.categoryName}/${e.data.rname}`})}>
                    <Column field="rid" header = "rid"/>
                    <Column field="rname" header="rname" />
                    <Column field="address" header="address" />
                    <Column field="minimumspending" header="minimumspending" />
                    <Column field="rid" body={this.selectRestaurant}/>
                </DataTable>
            </div>
        )
    }
}
export default Restaurants 