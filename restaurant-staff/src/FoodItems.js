import React from "react"
import axios from "axios"
import {BrowserRouter as Router, Switch, Link, useRouteMatch, Route} from "react-router-dom"
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'

class FoodItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            foodData: [],
        }
    }

    componentDidMount() {

        const data = {
            rid: this.props.restaurantStaff.rid
        }

        axios.get('/api/get/getFoodItemsByRestaurantID', {params: data})
            .then(rsp => this.setState({foodData: rsp.data}))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <DataTable value = {this.state.foodData}>
                    <Column field="fid" header = "fid"/>
                    <Column field="fname" header="fname" sortable={true}/>
                    <Column field="description" header= "description" sortable={true}/>
                    <Column field="price" header="price" sortable={true}/>
                    <Column field="quantity" header="quantity" sortable={true}/>
                </DataTable>
            </div>
        )
    }

}

export default FoodItems