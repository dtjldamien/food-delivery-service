import React from "react"
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { InputText } from 'primereact/inputtext'

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
        this.setReviewData = this.setReviewData.bind(this)
        this.viewRating = this.viewRating.bind(this)
        this.setRating = this.setRating.bind(this)
        this.submitReview = this.submitReview.bind(this)
        this.setRowDataVisibility = this.setRowDataVisibility.bind(this)
    }

    componentDidMount() {

        const data = {
            email: this.props.customer.email
        }
        axios.get('/api/get/viewPastOrders', {params: data})
            .then(rsp => rsp.data.map(reviews => {
                reviews.visbility = false
                return reviews
            }))
            .then(rsp => this.setState({reviewData: rsp}))
            .catch(err => console.log(err))
    }

    setReviewData(foodreview, rowData) {
        console.log(rowData)
        const data = this.state.reviewData.slice()
        var copyData = []
        Object.assign(copyData, data)
        const index = copyData.findIndex((ele)=>{return ele===rowData})
        rowData.foodreview = foodreview
        copyData.splice(index, 1, rowData)
        this.setState({reviewData: copyData})
    }

    setRowDataVisibility(rowData, visible) {
        const data = this.state.reviewData.slice()
        var copyData = []
        Object.assign(copyData, data)
        rowData.visible = visible
        const index = this.state.reviewData.findIndex((ele)=>{return ele.oid===rowData.oid})
        copyData.splice(index, 1, rowData)
        this.setState({reviewData: copyData})
    }

    viewReview(rowData, review) {
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

            this.setState({visible: false})
        }

    }
    viewReviewDialog(rowData) {
        return (
            <div>
                <Dialog style={{width: '1000px'}} header="View Review" visible={rowData.visible} onHide={() => this.setRowDataVisibility(rowData, false)}>
                    {this.viewReview(rowData)}
                </Dialog>
                <Button label="View Review" onClick={()=> this.setRowDataVisibility(rowData, true)}></Button>
            </div>
        )
    }

    setRating(rating, rowData) {
        const data = this.state.reviewData.slice()
        var copyData = []
        Object.assign(copyData, data)
        const index = this.state.reviewData.findIndex((ele)=>ele===rowData)
        rowData.rating = rating
        copyData.splice(index, 1, rowData)
        this.setState({reviewData: copyData})
    }

    viewRating(rowData) {
        return (
            <div style={{margin: '0 auto'}}>
                <Rating value={rowData.rating} onChange={(e) => {this.setRating(e.target.value, rowData)}} cancel={false}/>
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

        let header = (
            <div style={{ 'textAlign': 'left' }}>
                <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
                <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search Reviews" size="50" />
            </div>
        );

        return (
            <div>
                <DataTable header={header} value = {this.state.reviewData} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                    <Column field="oid" header = "Order ID" sortable={true}/>
                    <Column field="orderdatetime" header="Date/Time" sortable={true} body={this.formatDateTime}/>
                    <Column field="rating" header="Rating" sortable={true} body={this.viewRating}/>
                    <Column field="rname" header="Restaurant Name" sortable={true}/>
                    <Column field="deliveryfee" header="Delivery Fee" sortable={true}/>
                    <Column field="address" header="Address" sortable={true}/>
                    <Column field="oid" body={this.viewReviewDialog}/>
                </DataTable>
            </div>
        )
    }
}
export default Reviews