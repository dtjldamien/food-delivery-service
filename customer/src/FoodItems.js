import React from "react"
import axios from 'axios'
import { DataTable, Column } from 'primereact/datatable'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';


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
        this.checkout = this.checkout.bind(this)
    }

    componentDidMount() {
        const restaurant = this.props.location.state.selectedRestaurant
        this.setState({restaurantData: restaurant})
        const restaurantID = {
            rid: restaurant.rid
        }
        
        axios.get('/api/get/getFoodItemsByRestaurantID', {params: restaurantID})
                .then(data => data.data.map(foodItems => foodItems))
                .then(foodItems => foodItems.map(food => {
                    food.quantity = 0
                    return food
                }))
                .then(foodItems=>this.setState({foodData:foodItems}))

        this.setState({customer: this.props.customer})
    }

    handleCartAdd(newCart, rowData) {

        if(parseInt(rowData.quantity) > 0) {
            this.setState((prevState) => {return ({cart: newCart})})
            alert("Added To Cart")
        } else {
            alert("Quantity Must Be Above 0")
        }

    }

    handleQuantityChange(rowData, quantity) {
        const data = this.state.foodData.slice()
        var copyData = []
        Object.assign(copyData, data)
        rowData.quantity = quantity
        const index = this.state.foodData.findIndex(function(ele) {
            return ele.fid === rowData.fid
        })
        copyData.splice(index, 1, rowData)
        this.setState({foodData: copyData})
    }

    addToCart(rowData, column) {
        const newCart = this.state.cart.slice()
        newCart.push(rowData)
        return <div>
            {/* <InputText style={{display:'inline-block', width:'50px'}} value={this.state.value} onChange={(e) => this.handleQuantityChange(rowData, e.target.value)} /> */}
            <Button style={{display:'inline-block'}} label="Add To Cart" onClick={()=>this.handleCartAdd(newCart, rowData)}></Button>
        </div>
    }

    quantityInput(rowData, column) {
        return <div>
            <InputText style={{display:'inline-block', width:'50px'}} value={rowData.quantity} onChange={(e) => this.handleQuantityChange(rowData, e.target.value)} />
        </div>
    }

    viewCart() {

        const cartCost = this.state.cart.length > 0 ? (this.state.cart.map(cart => parseFloat(cart.price) * parseFloat(cart.quantity)).reduce((total, price) => total + price)).toString() : "0"

        let header = (
            <div style={{'textAlign':'left'}}>
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
            </div>
        );
        return this.state.cart.length > 0 ?

        /* Renders data table if the cart is not empty */
        (
            <div>
                <h3>Total Cost: ${cartCost}             Minimum Spending: ${this.state.restaurantData.minimumspending}</h3>
                <DataTable value = {this.state.cart} header={header} globalFilter={this.state.globalFilter} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                    <Column field="fid" header = "fid"/>
                    <Column field="fname" header="fname" sortable={true}/>
                    <Column field="description" header= "description" sortable={true}/>
                    <Column field="price" header="price" sortable={true}/>
                    <Column field="quantity" header="quantity" sortable={true}/>
                </DataTable>
                <Button label="Checkout" onClick={this.checkout}></Button>
            </div>
        )

        :

        (
            <div>
                <h4>Empty Cart!</h4>
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

    checkout = async (event) =>  {

        event.preventDefault();

        /* Preps Data to pass into API call */
        const orderItem = {
            totalCost: (this.state.cart.map(cart => parseFloat(cart.price) * parseFloat(cart.quantity)).reduce((total, price) => total + price)).toString(),
            deliveryFee: '5',
            address: this.state.restaurantData.address,
            rid: this.state.restaurantData.rid,
            listOfFoods: this.state.cart.map(cart => ({
                fid: cart.fid,
                price: cart.price,
                quantity: cart.quantity
            })),
            customerEmail: this.state.customer.email,
            creditCard: this.state.customer.creditcard
        }

        if (parseFloat(orderItem.totalCost) <  parseFloat(this.state.restaurantData.minimumspending)) {
            alert("Total Cart Below Minimum Spending of $" + this.state.restaurantData.minimumspending)
        } else {

            /* Calls API and prints response */
            await axios.post('/api/post/createOrder', orderItem)
                .then(rsp => alert(rsp.data))
                .catch(err => console.log(err))

            /* Reinitialises carts, values and closes the dialog */
            this.setState((prevState) => {return ({cart: [], newCart: [], value: '', visible: false})})
        
        }
        
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
                 <DataTable value = {this.state.foodData} header={header} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" globalFilter={this.state.globalFilter}>
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