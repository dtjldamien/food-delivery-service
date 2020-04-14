import React from "react"
import axios from 'axios'
import datatable, { DataTable, Column } from 'primereact/datatable'
import { Link, Redirect } from 'react-router-dom'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import {InputText} from 'primereact/inputtext';
class FoodItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantData: [],
            foodData: [],
            visible: false,
            cart: [],
            newCart:[],
            value: '',
            customer: {}
        }
        this.viewCart = this.viewCart.bind(this)
        this.viewCartDialog = this.viewCartDialog.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.handleCartAdd = this.handleCartAdd.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.quantityInput = this.quantityInput.bind(this)
        this.orderItemCreation = this.orderItemCreation.bind(this)
        this.checkout = this.checkout.bind(this)
    }
    componentDidMount() {
        const restaurant = this.props.location.state.selectedRestaurant
        this.setState({restaurantData: restaurant})
        const restaurantID = {
            rid: restaurant.rid
        }
        // console.log(this.state)
        console.log(this.props)
        console.log(this.state)
        axios.get('/api/get/getFoodItemsByRestaurantID', {params: restaurantID})
        .then(data => data.data.map(foodItems => foodItems))
        .then(foodItems=>this.setState({foodData:foodItems}))
        this.setState({customer: this.props.customer})
    }
    handleCartAdd(newCart) {
        this.setState((prevState) => {return ({cart: newCart})})
        console.log(newCart)
        alert("Added To Cart")
    }
    handleQuantityChange(rowData, quantity) {
        this.setState({value: quantity})
        rowData.quantity = quantity
        console.log(rowData)
        this.setState({newCart: rowData})
    }
    addToCart(rowData, column) {
        const newCart = this.state.cart.slice()
        var copyCart = {}
        Object.assign(copyCart, this.state.newCart)
        newCart.push(copyCart)
        return <div>
            {/* <InputText style={{display:'inline-block', width:'50px'}} value={this.state.value} onChange={(e) => this.handleQuantityChange(rowData, e.target.value)} /> */}
            <Button style={{display:'inline-block'}} label="Add To Cart" onClick={()=>this.handleCartAdd(newCart)}></Button>
        </div>
    }
    quantityInput(rowData, column) {
        return <div>
            <InputText style={{display:'inline-block', width:'50px'}} value={this.state.value} onChange={(e) => this.handleQuantityChange(rowData, e.target.value)} />
        </div>
    }
    viewCart() {
        return (
            <div>
                <DataTable value = {this.state.cart}>
                    <Column field="fid" header = "fid"/>
                    <Column field="fname" header="fname" sortable={true}/>
                    <Column field="description" header= "description" sortable={true}/>
                    <Column field="price" header="price" sortable={true}/>
                    <Column field="quantity" header="quantity" sortable={true}/>
                </DataTable>
                <Button label="Checkout" onClick={this.checkout}></Button>
            </div>
        )
    }
    viewCartDialog() {
        return (
            <div>
                <Dialog header="View Cart" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    {this.viewCart()}
                </Dialog>
                <Button label=" View Cart" onClick={()=> this.setState({visible: true})}></Button>
            </div>
        )
    }
    checkout() {
        alert("pay by cash plz")
        //to push into database
        const orderItem = this.orderItemCreation()
    }
    orderItemCreation() {
        const totalCost = (this.state.cart.map(cart => parseFloat(cart.price)).reduce((total, price) => total + price)).toString()
        const deliveryFee = '$5'
        const address = this.state.restaurantData.address
        const rid = this.state.restaurantData.rid
        const listOfFoods = this.state.cart.map(cart => ({
            fid: cart.fid,
            price: cart.price,
            quantity: cart.quantity
        }))
        const customerEmail = this.state.customer.email
        const creditCard = this.state.customer.creditcard
        const orderItem = {
            totalCost: totalCost,
            deliveryFee: deliveryFee,
            address: address,
            rid: rid,
            listOfFoods: listOfFoods,
            customerEmail: customerEmail,
            creditCard: creditCard
        }
        return orderItem
    }
    render() {
        return (
            <div>
                 <DataTable value = {this.state.foodData}>
                    <Column field="fid" header = "fid"/>
                    <Column field="fname" header="fname" sortable={true}/>
                    <Column field="description" header= "description" sortable={true}/>
                    <Column field="price" header="price" sortable={true}/>
                    <Column field="fid" header="quantity" body={this.quantityInput}/>
                    <Column field="fid" body={this.addToCart}/>
                </DataTable>
                {this.viewCartDialog()}
            </div>
        )
    }
}
export default FoodItems