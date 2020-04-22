import React from "react"
import axios from "axios"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderData: [],
            cart: []
        }
        this.viewOrder = this.viewOrder.bind(this)
        this.viewOrderDialog = this.viewOrderDialog.bind(this)
        this.retrieveCartFromOrder = this.retrieveCartFromOrder.bind(this)
    }

    componentDidMount() {

        const data = {
            email: this.props.customer.email
        }

        axios.get('/api/get/viewPastOrders', {params: data})
            .then(rsp => this.setState({orderData: rsp.data}))
            .catch(err => console.log(err))
    }

    retrieveCartFromOrder = async (oid) => {

        const data = {
            oid: oid
        }

        await axios.get('/api/get/viewCartFromOrder', {params: data})
            .then(rsp => this.setState({cart: rsp.data}))
            .catch(err => console.log(err))

    }

    viewOrder() {

        return (
            <div>
                <DataTable value = {this.state.cart} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                    <Column field="fid" header = "fid"/>
                    <Column field="fname" header="fname" sortable={true}/>
                    <Column field="description" header= "description" sortable={true}/>
                    <Column field="price" header="price" sortable={true}/>
                    <Column field="quantity" header="quantity" sortable={true}/>
                </DataTable>
                {/* <Button label="Checkout" onClick={()=> alert("pay by cash plz")}></Button> */}
            </div>
        )
    }

    viewOrderDialog(rowData, column) {

        return (
            <div>
                <Dialog header="View Order" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    {this.viewOrder()}
                </Dialog>
                <Button label=" View Order" onClick={()=> {
                        this.setState({visible: true})
                        this.retrieveCartFromOrder(rowData.oid)
                    }}></Button>
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
            <div style={{'textAlign':'left'}}>
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
            </div>
        );
        return (
            <div>
                <DataTable value = {this.state.orderData} header={header} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" globalFilter={this.state.globalFilter}>
                    <Column field="oid" header = "oid"/>
                    <Column field="rname" header="Restaurant" sortable={true}/>
                    <Column field="orderdatetime" header="Date/Time" body={this.formatDateTime} sortable={true}/>
                    <Column field="totalcost" header="Cost" sortable={true}/>
                    <Column field="deliveryfee" header="Delivery Fee" sortable={true}/>
                    <Column field="address" header="Address" sortable={true}/>
                    <Column field="oid" body={this.viewOrderDialog}/>
                </DataTable>
            </div>
        )
    }
}

export default Orders