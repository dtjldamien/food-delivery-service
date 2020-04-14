import React from "react"
import {BrowserRouter as Router, Switch, Link, useRouteMatch, Route} from "react-router-dom"
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderData: [
                {
                    oid: '1',
                    orderDateTime: '16/02/2018, 16:00',
                    description: 'From mcD',
                    totalCost: '$5 dollaroos',
                    deliveryFee: '$5 dollaroos',
                    address: '45 Lorong Ong Lye'        
                }
            ],
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
    }
    // componentDidMount() {
    //     // console.log(this.state)
    //     console.log(this.props)
    //     console.log(this.state)
    //     axios.get('/api/get/getFoodItemsByRestaurantID', {params: restaurantID})
    //     .then(data => data.data.map(foodItems => foodItems))
    //     .then(foodItems=>this.setState({foodData:foodItems}))
    // }
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
                <Button label="Checkout" onClick={()=> alert("pay by cash plz")}></Button>
            </div>
        )
    }
    viewOrderDialog() {
        return (
            <div>
                <Dialog header="View Order" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    {this.viewOrder()}
                </Dialog>
                <Button label=" View Order" onClick={()=> this.setState({visible: true})}></Button>
            </div>
        )
    }
    render() {
        return (
            <div>
            <DataTable value = {this.state.orderData}>
               <Column field="oid" header = "oid"/>
               <Column field="orderDateTime" header="Date/Time" sortable={true}/>
               <Column field="description" header= "description" sortable={true}/>
               <Column field="totalCost" header="Cost" sortable={true}/>
               <Column field="deliveryFee" header="Delivery Fee" sortable={true}/>
               <Column field="address" header="Address" sortable={true}/>
               <Column field="oid" body={this.viewOrderDialog}/>
           </DataTable>
       </div>
        )
    }
}

export default Orders