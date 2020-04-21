import React from "react"
import axios from 'axios'
import datatable, { DataTable, Column } from 'primereact/datatable'
import { Link, Redirect } from 'react-router-dom'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import {InputTextarea} from 'primereact/inputtextarea';
import {Rating} from 'primereact/rating';
class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewData: [
                {
                    oid: 1,
                    rating: 5,
                    rName: 'mcd',
                    deliveryFee: 5,
                    address: "Compton",
                    foodreview: "This food quite good but unhealthy"
                }
            ],
            orderData: [],
            visible: false
        };
        this.viewReviewDialog = this.viewReviewDialog.bind(this)
        this.viewReview = this.viewReview.bind(this)
        this.setReviewData = this.setReviewData.bind(this)
        this.viewRating = this.viewRating.bind(this)
        this.setRating = this.setRating.bind(this)
        this.submitReview = this.submitReview.bind(this)
    }

    componentDidMount() {

        const data = {
            email: this.props.customer.email
        }
        console.log(data)
        axios.get('/api/get/viewPastOrders', {params: data})
            .then(rsp => this.setState({reviewData: rsp.data}))
            .catch(err => console.log(err))
    }

    setReviewData(foodreview, rowData) {
        const data = this.state.reviewData.slice()
        var copyData = []
        Object.assign(copyData, data)
        const index = copyData.findIndex((ele)=>{return ele==rowData})
        rowData.foodreview = foodreview
        copyData.splice(index, 1, rowData)
        console.log(copyData)
        this.setState({reviewData: copyData})
    }

    viewReview(rowData, review) {
        console.log(this.state.reviewData)
        return (
            <div>
                <InputTextarea style={{width: '700px', height: '400px', fontSize: 'large'}} value={rowData.foodreview} onChange={(e) => {this.setReviewData(e.target.value, rowData)}}/>
                <Button label="Submit Review" onClick={e => this.submitReview(rowData, e)}></Button>
            </div>
        )
    }

    submitReview = async (rowData, event) => {

        event.preventDefault();

        if (rowData.rating === '0' || rowData.foodreview === '') {
            alert('Review Not Changed or Made.')
        } else {

            const data =  {
                oid: rowData.oid,
                rating: rowData.rating,
                foodReview: rowData.foodreview
            }

            await axios.put('/api/put/createReview', {params : data})
                .then(res => alert("Review Successfully Updated!"))
                .catch(err => alert("An Error Ocurred."))

        }

    }

    viewReviewDialog(rowData) {
        return (
            <div>
                <Dialog header="View Review" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    {this.viewReview(rowData)}
                </Dialog>
                <Button label="View Review" onClick={()=> this.setState({visible: true})}></Button>
            </div>
        )
    }

    setRating(rating, rowData) {
        const data = this.state.reviewData.slice()
        var copyData = []
        Object.assign(copyData, this.state.data)
        copyData.filter((data) => {return (data != rowData)})
        rowData.rating = rating
        copyData.push(rowData)
        console.log(copyData)
        this.setState({reviewData: copyData})
    }

    viewRating(rowData) {
        return (
            <div style={{margin: '0 auto'}}>
                <Rating value={rowData.rating} onChange={(e) => {this.setRating(e.target.value, rowData)}} cancel={false}/>
            </div>
        )
    }
    
    render() {
        return (
            <div>
                <DataTable value = {this.state.reviewData}>
                    <Column field="oid" header = "oid"/>
                    <Column field="orderdatetime" header = "Date/Time"/>
                    <Column field="rating" header="Rating" sortable={true} body={this.viewRating}/>
                    <Column field="rname" header="rName" sortable={true}/>
                    <Column field="deliveryfee" header="Delivery Fee" sortable={true}/>
                    <Column field="address" header="Address" sortable={true}/>
                    <Column field="foodreview" body={this.viewReviewDialog}/>
                </DataTable>
            </div>
        )
    }
}
export default Reviews