import React from "react"
import axios from 'axios'
import { DataTable, Column } from 'primereact/datatable'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton'


class FoodItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantData: [],
            foodData: [],
            visible: false,
            cart: [],
            newCart: [],
            value: '',
            customer: {},
            customerPreviousAddresses: [],
            selectedDeliveryLocation: ""
        }
        this.viewCart = this.viewCart.bind(this)
        this.viewCartDialog = this.viewCartDialog.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.handleCartAdd = this.handleCartAdd.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.quantityInput = this.quantityInput.bind(this)
        this.checkout = this.checkout.bind(this)
        this.getLatestLocations = this.getLatestLocations.bind(this)
        this.viewDeliveryLocations = this.viewDeliveryLocations.bind(this)
    }

    componentDidMount() {

        const restaurant = this.props.location.state.selectedRestaurant
        this.setState({ restaurantData: restaurant })
        const restaurantID = {
            rid: restaurant.rid
        }

        axios.get('/api/get/getFoodItemsByRestaurantID', { params: restaurantID })
            .then(data => data.data.map(foodItems => foodItems))
            .then(foodItems => foodItems.map(food => {
                food.quantity = 0
                return food
            }))
            .then(foodItems => this.setState({ foodData: foodItems }))

        this.setState({ customer: this.props.customer })

    }

    handleCartAdd(newCart, rowData) {
        console.log(rowData)
        var qty = parseInt(rowData.quantity)
        if((qty > 0) && (rowData.availability >= qty)) {
            this.setState((prevState) => {return ({cart: newCart})})
            alert("Added To Cart")
        } 
        else if (qty > 0) {
            alert("The restaurant only has " + rowData.availability.toString() + " left")
        } 
        else {
            alert("Quantity Must Be Above 0")
        }

    }

    handleQuantityChange(rowData, quantity) {
        const data = this.state.foodData.slice()
        var copyData = []
        Object.assign(copyData, data)
        rowData.quantity = quantity
        const index = this.state.foodData.findIndex(function (ele) {
            return ele.fid === rowData.fid
        })
        copyData.splice(index, 1, rowData)
        this.setState({ foodData: copyData })
    }

    addToCart(rowData, column) {
        const newCart = this.state.cart.slice()
        newCart.push(rowData)
        return <div>
            {/* <InputText style={{display:'inline-block', width:'50px'}} value={this.state.value} onChange={(e) => this.handleQuantityChange(rowData, e.target.value)} /> */}
            <Button style={{ display: 'inline-block' }} label="Add To Cart" onClick={() => this.handleCartAdd(newCart, rowData)}></Button>
        </div>
    }

    quantityInput(rowData, column) {
        return <div>
            <InputText style={{ display: 'inline-block', width: '50px' }} value={rowData.quantity} onChange={(e) => this.handleQuantityChange(rowData, e.target.value)} />
        </div>
    }

    viewCart() {

        const cartCost = this.state.cart.length > 0 ? (this.state.cart.map(cart => parseFloat(cart.price) * parseFloat(cart.quantity)).reduce((total, price) => total + price)).toString() : "0"

        let header = (
            <div style={{ 'textAlign': 'left' }}>
                <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
                <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" size="50" />
            </div>
        );
        return this.state.cart.length > 0 ?

            /* Renders data table if the cart is not empty */
            (
                <div>
                    <h3>Total Cost: ${cartCost}             Minimum Spending: ${this.state.restaurantData.minimumspending}</h3>
                    <h3>Deliver To: {this.state.selectedDeliveryLocation}</h3>
                    <div>
                        <RadioButton inputId={this.state.customer.address} name={this.state.customer.address} value={this.state.customer.address} onChange={(e) => this.setState({selectedDeliveryLocation: e.value})} checked={this.state.selectedDeliveryLocation === this.state.customer.address}/>
                        <label htmlFor={this.state.customer.address}> Use Current Address: {this.state.customer.address}</label>
                    </div>
                    <div>
                        <h3>Previous Delivery Locations</h3>
                        {this.viewDeliveryLocations()}
                        <h3>Enter New Delivery Location:</h3>
                        <InputText value={this.state.selectedDeliveryLocation} onChange={(e) => this.setState({selectedDeliveryLocation: e.target.value})}/>
                    </div>
                    <DataTable value={this.state.cart} header={header} globalFilter={this.state.globalFilter} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                        <Column field="fid" header="fid" />
                        <Column field="fname" header="fname" sortable={true} />
                        <Column field="description" header="description" sortable={true} />
                        <Column field="price" header="price" sortable={true} />
                        <Column field="quantity" header="quantity" sortable={true} />
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

    viewDeliveryLocations() {
        
        const locations = []
        
        this.state.customerPreviousAddresses.map(address => 
            locations.push(
                <div>
                    <RadioButton inputId={address} name={address} value={address} onChange={(e) => this.setState({selectedDeliveryLocation: e.value})} checked={this.state.selectedDeliveryLocation === address}/>
                    <label htmlFor={address}> {address}</label>
                </div>
            )
        )

        return locations
    }

    viewCartDialog() {
        return (
            <div>
                <Dialog header="View Cart" visible={this.state.visible} onHide={() => this.setState({ visible: false })}>
                    {this.viewCart()}
                </Dialog>
                <Button label=" View Cart" onClick={(e) => { 
                    this.setState({ visible: true })
                    this.getLatestLocations(e)}}></Button>
            </div>
        )
    }

    getLatestLocations = async (event) => {
        
        event.preventDefault()

        const data = {
            email: this.state.customer.email
        }

        const deliveryLocations = new Set()

        await axios.get('/api/get/viewRecentDeliveryLocations', { params: data })
            .then(rsp => rsp.data)
            .then(data => data.map(previousAddresses => deliveryLocations.add(previousAddresses.address)))
            .catch(err => console.log(err))

        this.setState({ customerPreviousAddresses: Array.from(deliveryLocations) })

        console.log(this.state.customerPreviousAddresses)
    }

    checkout = async (event) => {

        event.preventDefault();

        /* Preps Data to pass into API call */
        const orderItem = {
            totalCost: (this.state.cart.map(cart => parseFloat(cart.price) * parseFloat(cart.quantity)).reduce((total, price) => total + price)).toString(),
            deliveryFee: '5',
            address: this.state.selectedDeliveryLocation,
            rid: this.state.restaurantData.rid,
            listOfFoods: this.state.cart.map(cart => ({
                fid: cart.fid,
                price: cart.price,
                quantity: cart.quantity
            })),
            customerEmail: this.state.customer.email,
            creditCard: this.state.customer.creditcard
        }

        if (parseFloat(orderItem.totalCost) < parseFloat(this.state.restaurantData.minimumspending)) {
            alert("Total Cart Below Minimum Spending of $" + this.state.restaurantData.minimumspending)
        } else if (orderItem.address === ''){
            alert("Please Enter A Delivery Address")
        } else {

            /* Calls API and prints response */
            await axios.post('/api/post/createOrder', orderItem)
                .then(rsp => alert(rsp.data))
                .catch(err => console.log(err))

            /* Reinitialises carts, values and closes the dialog */
            this.setState((prevState) => { return ({ cart: [], newCart: [], value: '', visible: false }) })

        }

    }

    render() {
        let header = (
            <div style={{ 'textAlign': 'left' }}>
                <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
                <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" size="50" />
            </div>
        );
        return ( //max out input for availability
            <div>
                <DataTable value={this.state.foodData} header={header} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" globalFilter={this.state.globalFilter}>
                    <Column field="fid" header="fid" />
                    <Column field="fname" header="fname" sortable={true} />
                    <Column field="description" header="description" sortable={true} />
                    <Column field="price" header="price" sortable={true} />
                    <Column field="fid" header="quantity" body={this.quantityInput} />
                    <Column field="fid" body={this.addToCart} />
                </DataTable>
                {this.viewCartDialog()}
            </div>
        )
    }
}
export default FoodItems