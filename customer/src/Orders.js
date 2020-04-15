import React from "react"
import axios from "axios"
import {BrowserRouter as Router, Switch, Link, useRouteMatch, Route} from "react-router-dom"
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderData: [],
            cart: [
                {
                    fid: '1',
                    fname: 'burger',
                    description: 'test',
                    price: '$?',
                    quantity: '2'
                }
            ]
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
                <DataTable value = {this.state.cart}>
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

    render() {
        return (
            <div>
            <DataTable value = {this.state.orderData}>
               <Column field="oid" header = "oid"/>
               <Column field="rname" header="Restaurant"/>
               <Column field="orderdatetime" header="Date/Time" sortable={true}/>
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