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
        console.log(data)
        axios.get('/api/get/viewPastOrders', {params: data})
            .then(rsp => rsp.data.map(reviews => {
                reviews.visbility = false
                return reviews
            }))
            .then(rsp => this.setState({reviewData: rsp}))
            .catch(err => console.log(err))
    }

    setReviewData(foodreview, rowData) {
        const data = this.state.reviewData.slice()
        var copyData = []
        Object.assign(copyData, data)
        const index = copyData.findIndex((ele)=>{return ele===rowData})
        console.log(index)
        rowData.foodreview = foodreview
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
        return (
            <div>
                <Dialog header="View Review" visible={rowData.visible} onHide={() => this.setRowDataVisibility(rowData, false)}>
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
    
    render() {
        return (
            <div>
                <DataTable value = {this.state.reviewData} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                    <Column field="oid" header = "oid"/>
                    <Column field="orderdatetime" header = "Date/Time"/>
                    <Column field="rating" header="Rating" sortable={true} body={this.viewRating}/>
                    <Column field="rname" header="rName" sortable={true}/>
                    <Column field="deliveryfee" header="Delivery Fee" sortable={true}/>
                    <Column field="address" header="Address" sortable={true}/>
                    <Column field="oid" body={this.viewReviewDialog}/>
                </DataTable>
            </div>
        )
    }
}
export default Reviews