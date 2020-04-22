import React from "react"
import axios from 'axios'
import { DataTable, Column } from 'primereact/datatable'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewData: [],
            orderData: [],
            visible: false
        };
        this.viewReviewDialog = this.viewReviewDialog.bind(this)
        this.viewReview = this.viewReview.bind(this)
        this.viewRating = this.viewRating.bind(this)
        this.setRowDataVisibility = this.setRowDataVisibility.bind(this)
    }

    componentDidMount() {
        const data = {
            rid: this.props.restaurantStaff.rid
        }
        axios.get('/api/get/viewRestaurantOrders', {params: data})
            .then(rsp => rsp.data.map(reviews => {
                reviews.visbility = false
                return reviews
            }))
            .then(rsp => this.setState({reviewData: rsp}))
            .catch(err => console.log(err))
    }

    viewReview(rowData, review) {
        return (
            <div>
                <InputTextarea style={{width: '700px', height: '400px', fontSize: 'large'}} value={rowData.foodreview}/>
            </div>
        )
    }

    setRowDataVisibility(rowData, visible) {
        const data = this.state.reviewData.slice()
        var copyData = []
        Object.assign(copyData, data)
        rowData.visible = visible
        const index = this.state.reviewData.findIndex(function(ele) {
            return ele.oid === rowData.oid
        })
        copyData.splice(index, 1, rowData)
        this.setState({reviewData: copyData})
    }

    viewReviewDialog(rowData) {
      console.log(rowData)
        return (
            <div>
                <Dialog header="View Review" visible={rowData.visible} onHide={() => this.setRowDataVisibility(rowData, false)}>
                    {this.viewReview(rowData)}
                </Dialog>
                <Button label="View Review" onClick={()=> this.setRowDataVisibility(rowData, true)}></Button>
            </div>
        )
    }

    viewRating(rowData) {
        return (
            <div style={{margin: '0 auto'}}>
                <Rating value={rowData.rating} cancel={false}/>
            </div>
        )
    }
    formatDateTime(rowData) {
        var dateTime = rowData.orderdatetime
        var dateArr = dateTime.split('T')
        var date = dateArr[0]
        var time = dateArr[1]
        var timeArr = time.split(':')
        var hour = timeArr[0]
        var minutes = timeArr[1]
        var formattedDateTime = date + " / " + hour + ":" + minutes
        return formattedDateTime
    }
    
    render() {
        return (
            <div>
                <DataTable value = {this.state.reviewData} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                    <Column field="oid" header = "oid" sortable={true}/>
                    <Column field="orderdatetime" header = "Date/Time" body={this.formatDateTime} sortable={true}/>
                    <Column field="rating" header="Rating" sortable={true} body={this.viewRating}/>
                    <Column field="email" header="Customer" sortable={true}/>
                    <Column field="deliveryfee" header="Delivery Fee" sortable={true}/>
                    <Column field="address" header="Address" sortable={true}/>
                    <Column field="oid" body={this.viewReviewDialog}/>
                </DataTable>
            </div>
        )
    }
}
export default Reviews