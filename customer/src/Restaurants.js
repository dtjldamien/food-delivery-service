import React from "react"
import axios from 'axios'
import { DataTable, Column } from 'primereact/datatable'
import { Link, Redirect } from 'react-router-dom'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import {Rating} from 'primereact/rating';
import {InputText} from 'primereact/inputtext'
class Restaurants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryName: "All",
            restaurantData: [],
            reviewData: [],
            redirect: null,
            selectedRestaurant: null,
            visible: false
        }
        this.selectRestaurant = this.selectRestaurant.bind(this)
        this.viewRestaurantReviewsDialog = this.viewRestaurantReviewsDialog.bind(this)
        this.viewReviewsDataTable = this.viewReviewsDataTable.bind(this)
        this.viewRating = this.viewRating.bind(this)
        this.restaurantRating = this.restaurantRating.bind(this)
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

    viewRestaurantReviewsDialog(rowData) {
        
        const header = rowData.rname + " reviews"
        
        return (
            <div>
                <Dialog header={header} visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    {this.viewReviewsDataTable()}
                </Dialog>
                <Button label="Reviews" onClick= {() => {
                    this.setState({visible: true}) 
                    this.viewReviews(rowData.rid)}
                    }/>
            </div>
        )

    }

    viewReviewsDataTable() {
        return (
            
            this.state.reviewData.length > 0 ?

            <DataTable value={this.state.reviewData}>
                <Column field="rating" header="Rating" body={this.viewRating}/>
                <Column field="foodreview" header="Review"/>
            </DataTable>

            : 

            <div>
                <h4>No Reviews Yet!</h4>
            </div>

        )
    }

    viewReviews = async (rid) => {

        const data = {
            rid: rid
        }

        await axios.get('/api/get/viewReviewOfRestaurant', {params: data})
            .then(rsp => this.setState({reviewData : rsp.data}))
            .catch(err => console.log(err))

    }

    viewRating(rowData) {

        return (
            <div style={{margin: '0 auto'}}>
                <Rating value={rowData.rating} cancel={false}/>
            </div>
        )
        
    }

    selectRestaurant(rowData, column) {
        return <div>
            <Button label="Select" onClick= {() => this.setState({selectedRestaurant: rowData, redirect: `/restaurants/${rowData.catname}/${rowData.rname}`})}/>
        </div>
    }

    restaurantRating(rowData) {
        return (
            <div style={{margin: '0 auto'}}>
                <Rating value={rowData.restaurantrating} cancel={false}/>
            </div>
        )
    }
    
    render() {
        let header = (
            <div style={{'textAlign':'left'}}>
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
            </div>
        );
        return (
            <div>
                {this.redirectOnClick()}
                <h1>{this.state.categoryName}</h1>
                <DataTable value = {this.state.restaurantData} header={header} globalFilter={this.state.globalFilter}>
                    <Column field="rid" header = "rid"/>
                    <Column field="rname" header="rname" />
                    <Column field="address" header="address" />
                    <Column field="minimumspending" header="minimumspending" />
                    <Column field="restaurantrating" header="Rating" body={this.restaurantRating}/>
                    <Column field="rid" header="Click To Select Restaurant" body={this.selectRestaurant}/>
                    <Column field="rid" header="View Restaurant Reviews" body={this.viewRestaurantReviewsDialog}/>
                </DataTable>
            </div>
        )
    }
}
export default Restaurants 